import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/use-user';
import { useSupabase } from '@/utils/use-supabase';
import { RouteKey } from '@/utils/enum';

import style from './TopHeader.module.css';

const TopHeader = () => {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const { replace, asPath } = useRouter();

  const initials = `${user?.first_name.charAt(0).toUpperCase()}${user?.last_name.charAt(0).toUpperCase()}`;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const logout = async () => {
    await supabase.auth.signOut();
    replace(RouteKey.signin);
  };

  const getRouteName = () => {
    const route = asPath.split('/')[1];
    switch (route) {
      case RouteKey.dashboard:
        return 'Dashboard';
      case RouteKey.transactions:
        return 'Transactions';
      case RouteKey.account:
        return 'Account';
    }
  };

  return (
    <div
      className='fixed z-10 top-0 right-0 w-full bg-white border-b border-l border-border-color py-3 px-4 md:px-8 xl:px-11 main-wrapper'>
      <div className='flex justify-between items-center '>
        <Link href='/dashboard' className='block lg:hidden'>
          <Image
            src="/assets/logo/logo.png"
            width="50"
            height="50"
            alt="logo"
          />
        </Link>
        <h2 className='text-lg text-black font-normal block hidden lg:block'>
          {getRouteName()}
        </h2>
        <div
          className={`relative cursor-pointer flex items-center p-2 ${style.profilePop}`}
        >
          <span
            className='w-8 h-8 p-1.5 text-sm bg-white text-black border border-black rounded-full '
            onClick={openPopup}
          >
            {initials}
          </span>
          <div
            className={isPopupOpen ? 'flex justify-end fixed' : 'hidden'}
            onClick={closePopup}
          >
            <ul
              className=' rounded shadow-lg bg-white h-fit mt-16 mr-2'
              onClick={openPopup}
            >
              <li
                className='flex items-center py-2 px-3 text-black hover:text-danger'
                onClick={() => logout()}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 256 256'
                >
                  <path
                    d='M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z'></path>
                </svg>
                <span className='ml-2'>Log out</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopHeader;
