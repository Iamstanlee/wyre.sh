import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabase } from '@/utils/use-supabase';
import { useEffect } from 'react';
import { RouteKey } from '@/utils/enum';
import { useRouter } from 'next/router';

export default function SignIn() {
  const { supabase } = useSupabase();
  const { replace, reload } = useRouter();

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, _) => {
      const authEvents = ['SIGNED_IN', 'MFA_CHALLENGE_VERIFIED'];
      if (authEvents.includes(event))
        replace(RouteKey.dashboard).then(() => reload());
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80">
        <Auth
          supabaseClient={supabase}
          providers={[]}
          magicLink={true}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(61, 135, 245)',
                  brandAccent: 'rgb(61, 135, 245)'
                },
                fonts: {}
              }
            }
          }}
        />
      </div>
    </div>
  );
}
