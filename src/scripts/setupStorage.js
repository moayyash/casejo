// Setup Storage Buckets for Supabase
// This script creates storage buckets for document uploads

import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://xhfafurmftitxpzyedfh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZmFmdXJtZnRpdHhwenllZGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODg4NDQsImV4cCI6MjA2MjU2NDg0NH0.eB6Ef26iWtTsgv42B8XUNPIDe-cKnnPQL0DH3Lp1Q-o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  console.log('Setting up storage buckets...');

  try {
    // Create case documents bucket
    console.log('Creating case_documents bucket...');
    const { error: caseDocumentsError } = await supabase.storage.createBucket('case_documents', {
      public: false,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    });
    
    if (caseDocumentsError) throw caseDocumentsError;

    // Create client documents bucket
    console.log('Creating client_documents bucket...');
    const { error: clientDocumentsError } = await supabase.storage.createBucket('client_documents', {
      public: false,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    });
    
    if (clientDocumentsError) throw clientDocumentsError;

    // Create profile pictures bucket
    console.log('Creating profile_pictures bucket...');
    const { error: profilePicturesError } = await supabase.storage.createBucket('profile_pictures', {
      public: true,
      fileSizeLimit: 2097152, // 2MB
      allowedMimeTypes: ['image/jpeg', 'image/png']
    });
    
    if (profilePicturesError) throw profilePicturesError;

    console.log('Storage buckets setup completed successfully!');
  } catch (error) {
    console.error('Error setting up storage buckets:', error);
  }
}

setupStorage();
