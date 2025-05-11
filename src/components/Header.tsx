import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Check if user is using bypass authentication
  const isBypassUser = localStorage.getItem('bypassAuth') === 'true';
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t('common.search')}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-sm font-medium">
              {user?.full_name || 'المستخدم'}
              {isBypassUser && <span className="text-xs text-blue-600 mr-1">(وضع التجاوز)</span>}
            </span>
          </button>
          
          {isProfileOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                الملف الشخصي
              </a>
              <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {t('navigation.settings')}
              </a>
              <button 
                onClick={logout}
                className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut size={16} className="ml-2" />
                  <span>{t('auth.logout')}</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
