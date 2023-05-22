import withLoading from '@/utils/with-loading';
import Layout from '@/components/Layout';
import UserTransaction from '@/components/UserTransaction/UserTransaction';

function TransactionComponent() {
  return (
    <Layout>
      <UserTransaction />
    </Layout>
  );
}

export default withLoading(TransactionComponent);
