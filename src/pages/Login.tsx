import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Scale, Mail, Lock, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, bypassAuth } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError(t('auth.emailRequired') + ' ' + t('auth.passwordRequired'));
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { error: loginError } = await login(email, password);
      
      if (loginError) {
        setError(loginError.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle bypass authentication
  const handleBypass = () => {
    bypassAuth();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-800 text-white py-6 px-8 text-center">
          <div className="flex justify-center mb-2">
            <Scale size={40} />
          </div>
          <h2 className="text-2xl font-bold">{t('app.title')}</h2>
          <p className="text-blue-200 mt-1">{t('app.subtitle')}</p>
        </div>
        
        <div className="p-8">
          <h3 className="text-xl font-bold text-center mb-6">{t('auth.login')}</h3>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  className="input-field pr-10"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                {t('auth.password')}
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  className="input-field pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-left mt-1">
                <a href="#forgot-password" className="text-sm text-blue-600 hover:underline">
                  {t('auth.forgotPassword')}
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full btn-primary py-3 font-bold mb-4"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.loginButton')}
            </button>
            
            {/* Bypass Authentication Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleBypass}
                className="flex items-center justify-center mx-auto text-blue-600 hover:text-blue-800 transition-colors"
              >
                <LogIn size={16} className="ml-1" />
                <span>دخول مباشر (تجاوز تسجيل الدخول)</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
