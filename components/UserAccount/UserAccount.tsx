import { useEffect, useMemo } from 'react';
import { useUser } from '@/utils/use-user';
import { useRouter } from 'next/router';
import { RouteKey } from '@/utils/enum';

const AccountItem = ({ title, value }: { title: string; value: string }) => (
  <div className='flex flex-col gap-1'>
    <p className='text-grey text-xs'>{title}</p>
    <p className='text-black'>{value}</p>
  </div>
);


const UserAccount = () => {
  const { user } = useUser();
  const { replace, reload } = useRouter();







  return (
    <div className='flex flex-col gap-6 mt-4'>
      <div className='pb-6 border-b border-border-color'>
        <h1 className='mb-2 text-black text-lg font-semibold'>User</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <AccountItem
            title='Name'
            value={`${user?.first_name} ${user?.last_name}`}
          />
          <AccountItem title='Email' value={user?.email_address ?? 'N/A'} />
        </div>
      </div>
      <div className='pb-6 border-b border-border-color'>
        <h1 className='mb-2 text-black text-lg font-semibold'>Business</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
          <AccountItem title='Business name' value={'N/A'} />
          <AccountItem
            title='Business niche'
            value={ 'N/A'}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
          <AccountItem
            title='Business description'
            value={'N/A'}
          />
          <AccountItem
            title='Business website'
            value={'N/A'}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <AccountItem
            title='Business color'
            value={'N/A'}
          />
        </div>
      </div>
      
    </div>
  )
    ;
};
export default UserAccount;
