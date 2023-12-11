import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sviygqlantzalyaaheuu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aXlncWxhbnR6YWx5YWFoZXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyMjI5OTUsImV4cCI6MjAxNzc5ODk5NX0.lXv78kzRoLaE3WwqrczoKidZ0blMxbQz8_LHAQqYs7A'
export const supabase = createClient(supabaseUrl, supabaseKey)