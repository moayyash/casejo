import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import jordanCourts, { Court, CourtType, courtTypeLabels } from '../data/jordanCourts';

interface CourtSelectorProps {
  value?: string;
  onChange: (courtId: string) => void;
  className?: string;
}

const CourtSelector: React.FC<CourtSelectorProps> = ({ value, onChange, className = '' }) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<CourtType | 'all'>('all');
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(jordanCourts);
  
  // Filter courts when type changes
  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredCourts(jordanCourts);
    } else {
      setFilteredCourts(jordanCourts.filter(court => court.type === selectedType));
    }
  }, [selectedType]);
  
  return (
    <div className={className}>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('cases.courtType')}
        </label>
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as CourtType | 'all')}
        >
          <option value="all">جميع المحاكم</option>
          {Object.entries(courtTypeLabels).map(([type, label]) => (
            <option key={type} value={type}>
              {label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('cases.courtName')}
        </label>
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- اختر المحكمة --</option>
          {filteredCourts.map((court) => (
            <option key={court.id} value={court.id}>
              {court.name} {court.location ? `(${court.location})` : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CourtSelector;
