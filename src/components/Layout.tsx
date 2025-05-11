import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTranslation } from 'react-i18next';

const Layout: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
          {t('app.title')} &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default Layout;
