// Main script to run all database setup scripts
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting complete database setup...');

// Run database setup script
console.log('\n=== SETTING UP DATABASE TABLES ===');
exec('node ' + join(__dirname, 'setupDatabase.js'), (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing database setup: ${error}`);
    return;
  }
  console.log(stdout);
  
  // After database is set up, set up RLS policies
  console.log('\n=== SETTING UP ROW LEVEL SECURITY ===');
  exec('node ' + join(__dirname, 'setupRLS.js'), (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing RLS setup: ${error}`);
      return;
    }
    console.log(stdout);
    
    // After RLS is set up, set up storage buckets
    console.log('\n=== SETTING UP STORAGE BUCKETS ===');
    exec('node ' + join(__dirname, 'setupStorage.js'), (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing storage setup: ${error}`);
        return;
      }
      console.log(stdout);
      
      console.log('\n=== DATABASE SETUP COMPLETE ===');
      console.log('Your Supabase database has been successfully set up with:');
      console.log('- All required tables and sample data');
      console.log('- Row Level Security policies');
      console.log('- Storage buckets for document uploads');
      console.log('\nYou can now use the application with the new database.');
    });
  });
});
