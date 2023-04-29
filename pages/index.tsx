import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { RouteKey } from '@/utils/enum';

export default function App() {
  return (
    <div />
  );
}


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    return {
      redirect: {
        destination: RouteKey.dashboard
      }
    };
  } else {
    return {
      redirect: {
        destination: RouteKey.signin
      }
    };
  }
};