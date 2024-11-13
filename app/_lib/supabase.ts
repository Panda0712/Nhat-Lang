import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uosairpkvqandijduspe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvc2FpcnBrdnFhbmRpamR1c3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyOTkzMzIsImV4cCI6MjA0Njg3NTMzMn0.CHHnC0WBAAnCGTlUYK8zUii4hxYSnlhgq3yEcq2jnv8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
