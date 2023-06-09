import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Scaffold from '@/components/Scaffold';
import UserContextProvider from '@/utils/use-user';
import SupabaseContextProvider from '@/utils/use-supabase';

import 'styles/chrome-bug.css';
import 'styles/main.css';
import ToastProvider from '@/utils/use-toast';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <SupabaseContextProvider>
      <ToastProvider>
        <UserContextProvider>
          <Scaffold>
            <Component {...pageProps} />
          </Scaffold>
        </UserContextProvider>
      </ToastProvider>
    </SupabaseContextProvider>
  );
}
