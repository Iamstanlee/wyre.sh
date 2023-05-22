import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PaymentLink, Transaction, User, Wallet } from 'types';
import { useSupabase } from '@/utils/use-supabase';
import { DbTable, PaymentLinkType, RouteKey } from '@/utils/enum';
import { useRouter } from 'next/router';
import { useCurrencyFormatter } from '@/utils/use-intl';

interface UserBootstrapData extends User {
  user: User;
  wallet: Wallet;
  payment_links: PaymentLink[];
  transactions: Transaction[];
}


type UserContextType = {
  user?: UserBootstrapData;
  wallet?: Wallet;
  paymentLinks?: PaymentLink[];
  mainPaymentLink?: PaymentLink;
  transactions: Transaction[];
  isLoading: boolean;
  strWalletBalance: string;
  getUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}


export default function UserContextProvider(props: Props) {
  const { replace } = useRouter();
  const { supabase, supabaseUser } = useSupabase();
  const [isLoading, setIsloading] = useState(true);
  const [bootstrapData, setBootstrapData] = useState<UserBootstrapData>();
  const usdFormatter = useCurrencyFormatter();


  useEffect(() => {
    if (supabaseUser) {
      getUser();
    }
  }, [supabaseUser]);

  const user = useMemo(() => bootstrapData, [bootstrapData]);
  const wallet = useMemo(() => bootstrapData?.wallet, [bootstrapData]);
  const paymentLinks = useMemo(() => bootstrapData?.payment_links, [bootstrapData]);
  const mainPaymentLink = paymentLinks?.find((link) => link.type == PaymentLinkType.link);
  const transactions = useMemo(() => bootstrapData?.transactions.sort((a, b) => new Date(b.created_at).getMilliseconds() - new Date(a.created_at).getMilliseconds()) ?? [], [bootstrapData]);

  const strWalletBalance = useMemo(() => usdFormatter.format(wallet?.balance ?? 0), [wallet]);


  const gotoSetup = () => {
    replace(RouteKey.setup).then(() => setIsloading(false));
  };

  const getUser = async () => {
    setIsloading(true);
    const { data, error } = await supabase
      .from(DbTable.users)
      // Decouple transactions query
      .select('*, payment_links(*), wallet:wallets(*), transactions(*)')
      .match({ id: supabaseUser?.id })
      .single();
    if (error) {
      // TODO: Handle error better
      gotoSetup();
    } else {
      const bootstrap = data as UserBootstrapData;
      setBootstrapData(bootstrap);
      if (bootstrap.first_name === null || bootstrap.last_name === null) {
        gotoSetup();
      } else {
        setIsloading(false);
      }
    }
  };


  return <UserContext.Provider value={{
    isLoading,
    user,
    wallet,
    paymentLinks,
    mainPaymentLink,
    transactions,
    strWalletBalance,
    getUser,
  }} {...props} />;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
