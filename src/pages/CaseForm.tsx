import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CourtSelector from '../components/CourtSelector';
import { supabase, Case } from '../lib/supabase';

interface CaseFormProps {
  initialData?: Partial<Case>;
  isEditing?: boolean;
}

const CaseForm: React.FC<CaseFormProps> = ({ initialData = {}, isEditing = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<Case>>({
    title: '',
    case_number: '',
    client_id: '',
    case_type: '',
    status: 'active',
    court_name: '',
    filing_date: new Date().toISOString().split('T')[0],
    description: '',
    assigned_lawyers: [],
    ...initialData
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCourtChange = (courtId: string) => {
    setFormData(prev => ({ ...prev, court_name: courtId }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isEditing && initialData.id) {
        // Update existing case
        const { error: updateError } = await supabase
          .from('cases')
          .update(formData)
          .eq('id', initialData.id);
          
        if (updateError) throw updateError;
      } else {
        // Insert new case
        const { error: insertError } = await supabase
          .from('cases')
          .insert(formData);
          
        if (insertError) throw insertError;
      }
      
      navigate('/cases');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء حفظ القضية');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        {isEditing ? t('cases.editCase') : t('cases.addCase')}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('cases.caseTitle')}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('cases.caseNumber')}
            </label>
            <input
              type="text"
              name="case_number"
              value={formData.case_number}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('cases.client')}
            </label>
            <select
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">-- اختر العميل --</option>
              {/* Client options will be populated from API */}
              <option value="client-1">خالد العبدالله</option>
              <option value="client-2">شركة المستقبل</option>
              <option value="client-3">عائلة السالم</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('cases.caseType')}
            </label>
            <select
              name="case_type"
              value={formData.case_type}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">-- اختر نوع القضية --</option>
              <option value="civil">{t('cases.caseTypes.civil')}</option>
              <option value="criminal">{t('cases.caseTypes.criminal')}</option>
              <option value="commercial">{t('cases.caseTypes.commercial')}</option>
              <option value="family">{t('cases.caseTypes.family')}</option>
              <option value="labor">{t('cases.caseTypes.labor')}</option>
              <option value="administrative">{t('cases.caseTypes.administrative')}</option>
              <option value="other">{t('cases.caseTypes.other')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('cases.status')}
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="active">{t('cases.statuses.active')}</option>
              <option value="pending">{t('cases.statuses.pending')}</option>
              <option value="closed">{t('cases.statuses.closed')}</option>
              <option value="archived">{t('cases.statuses.archived')}</option>
            </select>
          </div>
          
          <CourtSelector 
            value={formData.court_name}
            onChange={handleCourtChange}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('cases.filingDate')}
            </label>
            <input
              type="date"
              name="filing_date"
              value={formData.filing_date}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('cases.description')}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/cases')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? t('common.loading') : t('common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseForm;
