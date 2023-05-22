import withLoading from '@/utils/with-loading';
import Layout from '@/components/Layout';
import Overview from '@/components/Overview/Overview';

function DashboardPage() {
  return (
    <Layout>
      <Overview />
    </Layout>
  );
}

export default withLoading(DashboardPage);
