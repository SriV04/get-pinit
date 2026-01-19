import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface WaitlistEntry {
  email: string;
  created_at?: string;
}

export async function addToWaitlist(email: string): Promise<{ success: boolean; isNew: boolean; error?: string }> {
  const { data, error } = await supabase
    .from('waitlist')
    .upsert({ email }, { onConflict: 'email', ignoreDuplicates: true })
    .select();

  if (error) {
    console.error('Supabase error:', error);
    return { success: false, isNew: false, error: error.message };
  }

  // Check if this was a new entry (data will be returned) or a duplicate (empty array)
  const isNew = data && data.length > 0;
  return { success: true, isNew };
}
