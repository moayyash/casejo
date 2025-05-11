// Setup Row Level Security (RLS) policies for Supabase
// This script sets up security policies for the database tables

import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://xhfafurmftitxpzyedfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZmFmdXJtZnRpdHhwenllZGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODg4NDQsImV4cCI6MjA2MjU2NDg0NH0.eB6Ef26iWtTsgv42B8XUNPIDe-cKnnPQL0DH3Lp1Q-o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupRLS() {
  console.log('Setting up Row Level Security policies...');

  try {
    // Enable RLS on all tables
    const tables = ['users', 'clients', 'cases', 'hearings', 'documents', 'case_updates'];
    
    for (const table of tables) {
      console.log(`Enabling RLS on ${table} table...`);
      
      // Enable RLS
      const { error: rlsError } = await supabase.rpc('alter_table_enable_rls', {
        table_name: table
      });
      
      if (rlsError) throw rlsError;
      
      // Create policies based on table
      switch (table) {
        case 'users':
          // Users policies
          await createPolicy(table, 'select_all', 'SELECT', 'true');
          await createPolicy(table, 'insert_admin', 'INSERT', "auth.jwt() -> 'role' = 'admin'");
          await createPolicy(table, 'update_admin', 'UPDATE', "auth.jwt() -> 'role' = 'admin'");
          await createPolicy(table, 'delete_admin', 'DELETE', "auth.jwt() -> 'role' = 'admin'");
          break;
          
        case 'clients':
          // Clients policies
          await createPolicy(table, 'select_all', 'SELECT', 'true');
          await createPolicy(table, 'insert_all', 'INSERT', 'true');
          await createPolicy(table, 'update_all', 'UPDATE', 'true');
          await createPolicy(table, 'delete_admin_lawyer', 'DELETE', "auth.jwt() -> 'role' IN ('admin', 'lawyer')");
          break;
          
        case 'cases':
          // Cases policies
          await createPolicy(table, 'select_all', 'SELECT', 'true');
          await createPolicy(table, 'insert_all', 'INSERT', 'true');
          await createPolicy(table, 'update_all', 'UPDATE', 'true');
          await createPolicy(table, 'delete_admin_lawyer', 'DELETE', "auth.jwt() -> 'role' IN ('admin', 'lawyer')");
          break;
          
        case 'hearings':
          // Hearings policies
          await createPolicy(table, 'select_all', 'SELECT', 'true');
          await createPolicy(table, 'insert_all', 'INSERT', 'true');
          await createPolicy(table, 'update_all', 'UPDATE', 'true');
          await createPolicy(table, 'delete_admin_lawyer', 'DELETE', "auth.jwt() -> 'role' IN ('admin', 'lawyer')");
          break;
          
        case 'documents':
          // Documents policies
          await createPolicy(table, 'select_all', 'SELECT', 'true');
          await createPolicy(table, 'insert_all', 'INSERT', 'true');
          await createPolicy(table, 'update_owner', 'UPDATE', "auth.uid() = uploaded_by OR auth.jwt() -> 'role' = 'admin'");
          await createPolicy(table, 'delete_owner', 'DELETE', "auth.uid() = uploaded_by OR auth.jwt() -> 'role' = 'admin'");
          break;
          
        case 'case_updates':
          // Case updates policies
          await createPolicy(table, 'select_all', 'SELECT', 'true');
          await createPolicy(table, 'insert_all', 'INSERT', 'true');
          await createPolicy(table, 'update_owner', 'UPDATE', "auth.uid() = updated_by OR auth.jwt() -> 'role' = 'admin'");
          await createPolicy(table, 'delete_owner', 'DELETE', "auth.uid() = updated_by OR auth.jwt() -> 'role' = 'admin'");
          break;
      }
    }

    console.log('RLS policies setup completed successfully!');
  } catch (error) {
    console.error('Error setting up RLS policies:', error);
  }
}

async function createPolicy(table, name, operation, expression) {
  console.log(`Creating ${operation} policy "${name}" on ${table}...`);
  
  const { error } = await supabase.rpc('create_policy', {
    table_name: table,
    policy_name: name,
    operation: operation,
    expression: expression
  });
  
  if (error) throw error;
}

setupRLS();
