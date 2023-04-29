import React from 'react';
import withLoading from '@/utils/with-loading';
import { today } from '@/utils/date';
import Layout from '@/components/Layout';
import { useUser } from '@/utils/use-user';
import Link from 'next/link';

function DashboardComponent() {
  return (
    <Layout>
      <h2 className="text-sm sm:text-base text-black font-normal block lg:hidden mb-2">
        {today()}
      </h2>
      <div>dashboard</div>
    </Layout>
  );
}

export default withLoading(DashboardComponent);
