import { useEffect } from 'react';
import PersonalInformation from './PersonalInformation';
import { useUser } from '@/utils/use-user';
import { useRouter } from 'next/router';
import { RouteKey } from '@/utils/enum';

const SetupSteps = () => {
  const { user } = useUser();
  const { replace } = useRouter();

  useEffect(() => {
    if (user?.first_name || user?.last_name) {
      replace(RouteKey.dashboard);
    }
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="py-8">
        <PersonalInformation />
      </div>
    </div>
  );
};
export default SetupSteps;
