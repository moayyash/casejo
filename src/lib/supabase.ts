import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xhfafurmftitxpzyedfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZmFmdXJtZnRpdHhwenllZGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODg4NDQsImV4cCI6MjA2MjU2NDg0NH0.eB6Ef26iWtTsgv42B8XUNPIDe-cKnnPQL0DH3Lp1Q-o';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types based on our schema
export type User = {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'lawyer' | 'assistant';
  created_at: string;
};

export type Client = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  created_at: string;
};

export type Case = {
  id: string;
  title: string;
  case_number: string;
  client_id: string;
  case_type: string;
  status: 'active' | 'pending' | 'closed' | 'archived';
  court_name: string;
  filing_date: string;
  description: string;
  assigned_lawyers: string[];
  created_at: string;
};

export type Hearing = {
  id: string;
  case_id: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  created_at: string;
};

export type Document = {
  id: string;
  case_id: string;
  name: string;
  file_path: string;
  uploaded_by: string;
  created_at: string;
};

export type CaseUpdate = {
  id: string;
  case_id: string;
  update_text: string;
  updated_by: string;
  created_at: string;
};
