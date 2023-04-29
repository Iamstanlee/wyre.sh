import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { RouteKey } from '@/utils/enum';

type SupabaseContext = {
  supabase: SupabaseClient;
  supabaseUser: User | undefined;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export default function SupabaseContextProvider(props: Props) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [supabaseUser, setSupabaseUser] = useState<User | undefined>();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data && data.session) {
        setSupabaseUser(data.session?.user);
      } else {
        router.replace(RouteKey.signin);
      }
    });
  }, []);


  return <Context.Provider value={{ supabase, supabaseUser }} {...props} />;
}

export const useSupabase = () => {
  let context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseContextProvider');
  }

  return context;
};