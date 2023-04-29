import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from 'types';
import { useSupabase } from '@/utils/use-supabase';
import { DbTable, RouteKey } from '@/utils/enum';
import { useRouter } from 'next/router';

type UserContextType = {
  user: User | null;
  payment: User['payment'] | null;
  isLoading: boolean
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export default function UserContextProvider(props: Props) {
  const { replace } = useRouter();
  const { supabase, supabaseUser } = useSupabase();
  const [isLoading, setIsloading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const payment = useMemo(() => user?.payment, [user]);

  useEffect(() => {
    if (supabaseUser) {
      getUser();
    }
  }, [supabaseUser]);

  const getUser = async () => {
    setIsloading(true);
    const { data, error } = await supabase
      .from(DbTable.users)
      // .select('*, payment:payments(*)')
      .select('*')
      .match({ id: supabaseUser?.id })
      .single();
    if (error) {
      gotoSignin();
    } else {
      const userData = data as User;
      setUser(userData);
      if (userData) {
        setIsloading(false);
      }
    }
  };

  const gotoSignin = () => {
    replace(RouteKey.signin).then(() => setIsloading(false));
  };

  const value = {
    isLoading,
    user,
    payment
  };

  return <UserContext.Provider value={value} {...props} />;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
