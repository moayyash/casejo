import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, User } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  bypassAuth: () => void; // New function for bypassing authentication
}

// Mock user data for bypass authentication
const mockUser: User = {
  id: 'mock-user-id',
  email: 'admin@example.com',
  full_name: 'مدير النظام',
  role: 'admin',
  created_at: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ error: null }),
  logout: async () => {},
  isAuthenticated: false,
  bypassAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if bypass mode is enabled in localStorage
  useEffect(() => {
    const bypassEnabled = localStorage.getItem('bypassAuth') === 'true';
    
    if (bypassEnabled) {
      setUser(mockUser);
      setLoading(false);
      return;
    }
    
    // Regular authentication flow
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        setUser(userData as User);
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setUser(userData as User);
        } else {
          // Don't reset user if bypass is enabled
          if (localStorage.getItem('bypassAuth') !== 'true') {
            setUser(null);
          }
        }
        
        setLoading(false);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error && data.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      setUser(userData as User);
    }
    
    return { error };
  };
  
  const logout = async () => {
    // Clear bypass flag when logging out
    localStorage.removeItem('bypassAuth');
    await supabase.auth.signOut();
    setUser(null);
  };
  
  // Function to bypass authentication
  const bypassAuth = () => {
    localStorage.setItem('bypassAuth', 'true');
    setUser(mockUser);
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    bypassAuth,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
