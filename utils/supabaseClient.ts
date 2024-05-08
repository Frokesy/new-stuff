import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kssxanjrolclcfcmdmvz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzc3hhbmpyb2xjbGNmY21kbXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDg1NDUsImV4cCI6MjAyMzc4NDU0NX0.A1_zbY6AKpUGX0iG6rZaG_CjVWkeeRPP0LIKiLLLJN8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)