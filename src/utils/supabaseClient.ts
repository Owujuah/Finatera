import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kckvsmsntgvdyqblxvcn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtja3ZzbXNudGd2ZHlxYmx4dmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU2NDIsImV4cCI6MjA1OTI4MTY0Mn0.q0-9x6mLdd5I6YZKIb5RQI63Pou9m4flvHeX9F8Yg_o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
