import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lkmpxlfeznptnlgkfhfe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrbXB4bGZlem5wdG5sZ2tmaGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNDcxMDYsImV4cCI6MjAxNDgyMzEwNn0.WGu9Fs0DH2UzOjw0tfg9mbw6OZ0fTWNVMHvSl90SjhY'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;