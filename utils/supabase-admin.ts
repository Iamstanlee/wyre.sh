import { createClient } from '@supabase/supabase-js';


// should only be used in server side (api) routes
export const supabaseAdmin = createClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `${process.env.SUPABASE_SERVICE_ROLE_KEY}`
);