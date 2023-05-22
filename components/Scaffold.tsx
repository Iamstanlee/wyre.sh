import { PropsWithChildren } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PageMetadata } from '@/types';
import Toast from 'components/ui/Toast';

interface Props extends PropsWithChildren {
  meta?: PageMetadata;
}

export default function Scaffold({ children, meta: pageMeta }: Props) {
  const router = useRouter();
  const meta: PageMetadata = {
    title: 'Wyre',
    description: 'Borderless Payments for Crypto',
    card_image: '/wyre.png',
    ...pageMeta
  };

  return (
    <>
      {/*Update values*/}
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <link href='/logo.png' rel='shortcut icon' />
        <meta content={meta.description} name='description' />
        <meta
          property='og:url'
          content={`https://app.muqee.ai${router.asPath}`}
        />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content={meta.title} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:image' content={meta.card_image} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@muqee_ai' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.card_image} />
      </Head>
      <Toast />
      <main id='skip'>{children}</main>
    </>
  );
}
