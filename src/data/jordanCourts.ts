/**
 * List of Jordanian courts organized by type and hierarchy
 * This data is collected from official Jordanian judicial sources
 */

export interface Court {
  id: string;
  name: string;
  nameEn?: string; // English name (optional)
  type: CourtType;
  location?: string;
}

export type CourtType = 
  | 'supreme'
  | 'cassation'
  | 'appeal'
  | 'first_instance'
  | 'magistrate'
  | 'special'
  | 'religious'
  | 'military'
  | 'administrative';

const jordanCourts: Court[] = [
  // Supreme Courts
  {
    id: 'supreme-constitutional',
    name: 'المحكمة الدستورية',
    nameEn: 'Constitutional Court',
    type: 'supreme',
    location: 'عمان'
  },
  {
    id: 'court-cassation',
    name: 'محكمة التمييز',
    nameEn: 'Court of Cassation',
    type: 'cassation',
    location: 'عمان'
  },
  {
    id: 'high-administrative',
    name: 'المحكمة الإدارية العليا',
    nameEn: 'High Administrative Court',
    type: 'administrative',
    location: 'عمان'
  },
  
  // Courts of Appeal
  {
    id: 'appeal-amman',
    name: 'محكمة استئناف عمان',
    nameEn: 'Amman Court of Appeal',
    type: 'appeal',
    location: 'عمان'
  },
  {
    id: 'appeal-irbid',
    name: 'محكمة استئناف إربد',
    nameEn: 'Irbid Court of Appeal',
    type: 'appeal',
    location: 'إربد'
  },
  {
    id: 'appeal-maan',
    name: 'محكمة استئناف معان',
    nameEn: 'Ma\'an Court of Appeal',
    type: 'appeal',
    location: 'معان'
  },
  {
    id: 'appeal-zarqa',
    name: 'محكمة استئناف الزرقاء',
    nameEn: 'Zarqa Court of Appeal',
    type: 'appeal',
    location: 'الزرقاء'
  },
  
  // First Instance Courts (Major Cities)
  {
    id: 'first-amman',
    name: 'محكمة بداية عمان',
    nameEn: 'Amman First Instance Court',
    type: 'first_instance',
    location: 'عمان'
  },
  {
    id: 'first-irbid',
    name: 'محكمة بداية إربد',
    nameEn: 'Irbid First Instance Court',
    type: 'first_instance',
    location: 'إربد'
  },
  {
    id: 'first-zarqa',
    name: 'محكمة بداية الزرقاء',
    nameEn: 'Zarqa First Instance Court',
    type: 'first_instance',
    location: 'الزرقاء'
  },
  {
    id: 'first-salt',
    name: 'محكمة بداية السلط',
    nameEn: 'Salt First Instance Court',
    type: 'first_instance',
    location: 'السلط'
  },
  {
    id: 'first-karak',
    name: 'محكمة بداية الكرك',
    nameEn: 'Karak First Instance Court',
    type: 'first_instance',
    location: 'الكرك'
  },
  {
    id: 'first-maan',
    name: 'محكمة بداية معان',
    nameEn: 'Ma\'an First Instance Court',
    type: 'first_instance',
    location: 'معان'
  },
  {
    id: 'first-aqaba',
    name: 'محكمة بداية العقبة',
    nameEn: 'Aqaba First Instance Court',
    type: 'first_instance',
    location: 'العقبة'
  },
  {
    id: 'first-mafraq',
    name: 'محكمة بداية المفرق',
    nameEn: 'Mafraq First Instance Court',
    type: 'first_instance',
    location: 'المفرق'
  },
  {
    id: 'first-jerash',
    name: 'محكمة بداية جرش',
    nameEn: 'Jerash First Instance Court',
    type: 'first_instance',
    location: 'جرش'
  },
  {
    id: 'first-ajloun',
    name: 'محكمة بداية عجلون',
    nameEn: 'Ajloun First Instance Court',
    type: 'first_instance',
    location: 'عجلون'
  },
  {
    id: 'first-madaba',
    name: 'محكمة بداية مادبا',
    nameEn: 'Madaba First Instance Court',
    type: 'first_instance',
    location: 'مادبا'
  },
  {
    id: 'first-tafilah',
    name: 'محكمة بداية الطفيلة',
    nameEn: 'Tafilah First Instance Court',
    type: 'first_instance',
    location: 'الطفيلة'
  },
  
  // Magistrate Courts (Sample of major ones)
  {
    id: 'magistrate-amman-north',
    name: 'محكمة صلح عمان الشمالية',
    nameEn: 'North Amman Magistrate Court',
    type: 'magistrate',
    location: 'عمان'
  },
  {
    id: 'magistrate-amman-south',
    name: 'محكمة صلح عمان الجنوبية',
    nameEn: 'South Amman Magistrate Court',
    type: 'magistrate',
    location: 'عمان'
  },
  {
    id: 'magistrate-amman-west',
    name: 'محكمة صلح عمان الغربية',
    nameEn: 'West Amman Magistrate Court',
    type: 'magistrate',
    location: 'عمان'
  },
  {
    id: 'magistrate-amman-east',
    name: 'محكمة صلح عمان الشرقية',
    nameEn: 'East Amman Magistrate Court',
    type: 'magistrate',
    location: 'عمان'
  },
  {
    id: 'magistrate-irbid',
    name: 'محكمة صلح إربد',
    nameEn: 'Irbid Magistrate Court',
    type: 'magistrate',
    location: 'إربد'
  },
  {
    id: 'magistrate-zarqa',
    name: 'محكمة صلح الزرقاء',
    nameEn: 'Zarqa Magistrate Court',
    type: 'magistrate',
    location: 'الزرقاء'
  },
  
  // Special Courts
  {
    id: 'state-security',
    name: 'محكمة أمن الدولة',
    nameEn: 'State Security Court',
    type: 'special',
    location: 'عمان'
  },
  {
    id: 'special-tax',
    name: 'محكمة الضريبة',
    nameEn: 'Tax Court',
    type: 'special',
    location: 'عمان'
  },
  {
    id: 'special-customs',
    name: 'محكمة الجمارك',
    nameEn: 'Customs Court',
    type: 'special',
    location: 'عمان'
  },
  {
    id: 'special-labor',
    name: 'محكمة العمل',
    nameEn: 'Labor Court',
    type: 'special',
    location: 'عمان'
  },
  
  // Religious Courts
  {
    id: 'sharia-supreme',
    name: 'المحكمة الشرعية العليا',
    nameEn: 'Supreme Sharia Court',
    type: 'religious',
    location: 'عمان'
  },
  {
    id: 'sharia-appeal-amman',
    name: 'محكمة الاستئناف الشرعية - عمان',
    nameEn: 'Sharia Court of Appeal - Amman',
    type: 'religious',
    location: 'عمان'
  },
  {
    id: 'sharia-appeal-irbid',
    name: 'محكمة الاستئناف الشرعية - إربد',
    nameEn: 'Sharia Court of Appeal - Irbid',
    type: 'religious',
    location: 'إربد'
  },
  {
    id: 'sharia-amman',
    name: 'المحكمة الشرعية - عمان',
    nameEn: 'Sharia Court - Amman',
    type: 'religious',
    location: 'عمان'
  },
  {
    id: 'sharia-irbid',
    name: 'المحكمة الشرعية - إربد',
    nameEn: 'Sharia Court - Irbid',
    type: 'religious',
    location: 'إربد'
  },
  {
    id: 'sharia-zarqa',
    name: 'المحكمة الشرعية - الزرقاء',
    nameEn: 'Sharia Court - Zarqa',
    type: 'religious',
    location: 'الزرقاء'
  },
  
  // Military Courts
  {
    id: 'military-appeal',
    name: 'محكمة الاستئناف العسكرية',
    nameEn: 'Military Court of Appeal',
    type: 'military',
    location: 'عمان'
  },
  {
    id: 'military-primary',
    name: 'المحكمة العسكرية',
    nameEn: 'Military Court',
    type: 'military',
    location: 'عمان'
  },
  
  // Administrative Courts
  {
    id: 'administrative-court',
    name: 'المحكمة الإدارية',
    nameEn: 'Administrative Court',
    type: 'administrative',
    location: 'عمان'
  }
];

/**
 * Get courts filtered by type
 */
export const getCourtsByType = (type: CourtType): Court[] => {
  return jordanCourts.filter(court => court.type === type);
};

/**
 * Get courts filtered by location
 */
export const getCourtsByLocation = (location: string): Court[] => {
  return jordanCourts.filter(court => court.location === location);
};

/**
 * Get all court types with Arabic labels
 */
export const courtTypeLabels: Record<CourtType, string> = {
  supreme: 'المحاكم العليا',
  cassation: 'محاكم التمييز',
  appeal: 'محاكم الاستئناف',
  first_instance: 'محاكم البداية',
  magistrate: 'محاكم الصلح',
  special: 'المحاكم الخاصة',
  religious: 'المحاكم الشرعية',
  military: 'المحاكم العسكرية',
  administrative: 'المحاكم الإدارية'
};

/**
 * Get all court locations
 */
export const getCourtLocations = (): string[] => {
  const locations = new Set(jordanCourts.map(court => court.location).filter(Boolean) as string[]);
  return Array.from(locations).sort();
};

export default jordanCourts;
