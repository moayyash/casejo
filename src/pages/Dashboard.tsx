import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  // Mock data for dashboard
  const stats = [
    { label: 'قضايا نشطة', value: 24, icon: <Briefcase size={20} />, color: 'bg-blue-500' },
    { label: 'جلسات هذا الأسبوع', value: 8, icon: <Calendar size={20} />, color: 'bg-green-500' },
    { label: 'عملاء جدد', value: 12, icon: <Users size={20} />, color: 'bg-purple-500' },
    { label: 'مستندات', value: 156, icon: <FileText size={20} />, color: 'bg-yellow-500' },
  ];
  
  const upcomingHearings = [
    { id: 1, caseTitle: 'قضية شركة الأمل ضد شركة النور', date: '2023-06-15', time: '10:00', court: 'المحكمة التجارية بالرياض' },
    { id: 2, caseTitle: 'قضية الإيجار - أحمد محمد', date: '2023-06-16', time: '11:30', court: 'محكمة الأحوال الشخصية' },
    { id: 3, caseTitle: 'قضية العقار - مجموعة الخليج', date: '2023-06-18', time: '09:00', court: 'المحكمة العامة' },
  ];
  
  const recentCases = [
    { id: 1, title: 'قضية تعويض - حادث سيارة', client: 'خالد العبدالله', status: 'active', date: '2023-06-10' },
    { id: 2, title: 'قضية عقد عمل', client: 'شركة المستقبل', status: 'pending', date: '2023-06-09' },
    { id: 3, title: 'قضية ميراث', client: 'عائلة السالم', status: 'active', date: '2023-06-08' },
    { id: 4, title: 'قضية تجارية - إخلال بالعقد', client: 'مؤسسة الريادة', status: 'closed', date: '2023-06-05' },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('dashboard.welcome')}
        </h1>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-full p-3 text-white mr-4`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calendar size={20} className="ml-2 text-blue-600" />
              {t('dashboard.upcomingHearings')}
            </h2>
            <a href="/hearings" className="text-sm text-blue-600 hover:underline">عرض الكل</a>
          </div>
          <div className="p-6">
            {upcomingHearings.length > 0 ? (
              <div className="space-y-4">
                {upcomingHearings.map((hearing) => (
                  <div key={hearing.id} className="flex items-start p-3 border-r-4 border-blue-500 bg-blue-50 rounded">
                    <div className="mr-4 bg-white rounded-full p-2 border border-blue-200">
                      <Clock size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{hearing.caseTitle}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <div className="flex items-center">
                          <span className="ml-2">{new Date(hearing.date).toLocaleDateString('ar-SA')}</span>
                          <span className="ml-2">{hearing.time}</span>
                          <span>-</span>
                          <span className="mr-2">{hearing.court}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                لا توجد جلسات قادمة
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Briefcase size={20} className="ml-2 text-blue-600" />
              {t('dashboard.activeCases')}
            </h2>
            <a href="/cases" className="text-sm text-blue-600 hover:underline">عرض الكل</a>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      القضية
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العميل
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاريخ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentCases.map((caseItem) => (
                    <tr key={caseItem.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{caseItem.client}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          caseItem.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : caseItem.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {caseItem.status === 'active' && <CheckCircle size={14} className="ml-1" />}
                          {caseItem.status === 'pending' && <AlertCircle size={14} className="ml-1" />}
                          {caseItem.status === 'active' ? 'نشطة' : caseItem.status === 'pending' ? 'معلقة' : 'مغلقة'}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(caseItem.date).toLocaleDateString('ar-SA')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md col-span-2">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <TrendingUp size={20} className="ml-2 text-blue-600" />
              {t('dashboard.statistics')}
            </h2>
          </div>
          <div className="p-6 h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>الرسم البياني للإحصائيات</p>
              <p className="text-sm mt-2">سيتم تنفيذ الرسوم البيانية في المرحلة القادمة</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Users size={20} className="ml-2 text-blue-600" />
              {t('dashboard.recentClients')}
            </h2>
            <a href="/clients" className="text-sm text-blue-600 hover:underline">عرض الكل</a>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  <span className="font-semibold">خ</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">خالد العبدالله</h3>
                  <p className="text-xs text-gray-500">عميل جديد - 10 يونيو 2023</p>
                </div>
              </li>
              <li className="py-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                  <span className="font-semibold">ش</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">شركة المستقبل</h3>
                  <p className="text-xs text-gray-500">عميل جديد - 9 يونيو 2023</p>
                </div>
              </li>
              <li className="py-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                  <span className="font-semibold">ع</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">عائلة السالم</h3>
                  <p className="text-xs text-gray-500">عميل جديد - 8 يونيو 2023</p>
                </div>
              </li>
              <li className="py-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
                  <span className="font-semibold">م</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">مؤسسة الريادة</h3>
                  <p className="text-xs text-gray-500">عميل جديد - 5 يونيو 2023</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
