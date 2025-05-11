// Database setup script for Supabase
// This script creates the necessary tables and initial data for the law office management system

import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://xhfafurmftitxpzyedfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZmFmdXJtZnRpdHhwenllZGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODg4NDQsImV4cCI6MjA2MjU2NDg0NH0.eB6Ef26iWtTsgv42B8XUNPIDe-cKnnPQL0DH3Lp1Q-o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Starting database setup...');

  try {
    // Create users table
    console.log('Creating users table...');
    const { error: usersError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'users',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'lawyer', 'assistant')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (usersError) throw usersError;

    // Create clients table
    console.log('Creating clients table...');
    const { error: clientsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'clients',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        full_name TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        address TEXT,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (clientsError) throw clientsError;

    // Create cases table
    console.log('Creating cases table...');
    const { error: casesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'cases',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        case_number TEXT NOT NULL,
        client_id UUID REFERENCES clients(id),
        case_type TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'pending', 'closed', 'archived')),
        court_name TEXT NOT NULL,
        filing_date DATE NOT NULL,
        description TEXT,
        assigned_lawyers UUID[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (casesError) throw casesError;

    // Create hearings table
    console.log('Creating hearings table...');
    const { error: hearingsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'hearings',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        case_id UUID REFERENCES cases(id),
        date DATE NOT NULL,
        time TIME NOT NULL,
        location TEXT NOT NULL,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (hearingsError) throw hearingsError;

    // Create documents table
    console.log('Creating documents table...');
    const { error: documentsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'documents',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        case_id UUID REFERENCES cases(id),
        name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        uploaded_by UUID REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (documentsError) throw documentsError;

    // Create case_updates table
    console.log('Creating case_updates table...');
    const { error: updatesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'case_updates',
      columns: `
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        case_id UUID REFERENCES cases(id),
        update_text TEXT NOT NULL,
        updated_by UUID REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (updatesError) throw updatesError;

    // Insert sample data
    console.log('Inserting sample data...');
    
    // Sample admin user
    const { error: adminError } = await supabase
      .from('users')
      .insert([
        {
          email: 'admin@example.com',
          full_name: 'مدير النظام',
          role: 'admin'
        }
      ]);
    
    if (adminError) throw adminError;
    
    // Sample lawyer user
    const { error: lawyerError } = await supabase
      .from('users')
      .insert([
        {
          email: 'lawyer@example.com',
          full_name: 'محمد الأحمد',
          role: 'lawyer'
        }
      ]);
    
    if (lawyerError) throw lawyerError;
    
    // Sample assistant user
    const { error: assistantError } = await supabase
      .from('users')
      .insert([
        {
          email: 'assistant@example.com',
          full_name: 'سارة العلي',
          role: 'assistant'
        }
      ]);
    
    if (assistantError) throw assistantError;
    
    // Sample clients
    const { data: clients, error: clientInsertError } = await supabase
      .from('clients')
      .insert([
        {
          full_name: 'خالد العبدالله',
          phone: '+962 79 123 4567',
          email: 'khalid@example.com',
          address: 'عمان، الدوار السابع',
          notes: 'عميل منذ 2020'
        },
        {
          full_name: 'شركة المستقبل للتجارة',
          phone: '+962 6 585 1234',
          email: 'info@future-company.example',
          address: 'عمان، شارع المدينة المنورة',
          notes: 'شركة تجارية متوسطة الحجم'
        },
        {
          full_name: 'سميرة الخالدي',
          phone: '+962 77 987 6543',
          email: 'samira@example.com',
          address: 'إربد، شارع الجامعة',
          notes: 'قضية طلاق'
        }
      ])
      .select();
    
    if (clientInsertError) throw clientInsertError;
    
    // Get the first client ID for sample case
    if (clients && clients.length > 0) {
      const clientId = clients[0].id;
      
      // Sample case
      const { error: caseError } = await supabase
        .from('cases')
        .insert([
          {
            title: 'نزاع عقاري - أرض الزرقاء',
            case_number: '2023/157',
            client_id: clientId,
            case_type: 'civil',
            status: 'active',
            court_name: 'first-zarqa',
            filing_date: '2023-05-15',
            description: 'نزاع على ملكية قطعة أرض في منطقة الزرقاء الجديدة'
          }
        ]);
      
      if (caseError) throw caseError;
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();
