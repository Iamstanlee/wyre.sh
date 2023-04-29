import { PropsWithChildren } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

import { PageMetadata } from '@/types';

interface Props extends PropsWithChildren {
  meta?: PageMetadata;
}

export default function Scaffold({ children, meta: pageMeta }: Props) {
  const router = useRouter();
  const meta: PageMetadata = {
    title: 'Xula',
    description: 'Content creation on autopilot',
    card_image: '/muqee_ai.png',
    ...pageMeta
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/logo_black_bg.png" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://app.muqee.ai${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.card_image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@muqee_ai" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.card_image} />
      </Head>
      <Script
        async
        src="https://analytics.umami.is/script.js"
        data-website-id="1283c323-0f6c-4169-9dc3-2d8c082712ac"
      ></Script>
      {/* <Script
        data-domain="app.muqee.ai"
        src="https://plausible.io/js/script.js"
        defer
      ></Script> */}
      {/* <Script>
        {`window.$crisp = [];
        window.CRISP_WEBSITE_ID = "d8b950ee-6036-43c1-a9d3-a071f7c19cdf";
        (function () {
          d = document;
          s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();`}
      </Script> */}
      <main id="skip">{children}</main>
    </>
  );
}
