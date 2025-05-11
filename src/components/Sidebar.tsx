import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  FileText, 
  UserCog,
  Settings,
  Scale
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: t('navigation.dashboard') },
    { to: '/cases', icon: <Briefcase size={20} />, label: t('navigation.cases') },
    { to: '/clients', icon: <Users size={20} />, label: t('navigation.clients') },
    { to: '/hearings', icon: <Calendar size={20} />, label: t('navigation.hearings') },
    { to: '/documents', icon: <FileText size={20} />, label: t('navigation.documents') },
    { to: '/users', icon: <UserCog size={20} />, label: t('navigation.users') },
    { to: '/settings', icon: <Settings size={20} />, label: t('navigation.settings') },
  ];
  
  return (
    <aside className="bg-blue-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-6 flex items-center">
        <Scale size={28} className="ml-2" />
        <h1 className="text-xl font-bold">{t('app.title')}</h1>
      </div>
      
      <nav className="mt-6">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center px-6 py-3 text-sm ${
                    isActive 
                      ? 'bg-blue-900 border-r-4 border-white' 
                      : 'hover:bg-blue-700'
                  }`
                }
              >
                <span className="ml-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
