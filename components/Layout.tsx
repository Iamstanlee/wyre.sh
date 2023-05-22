import { ReactNode } from 'react';
import SideBar from '@/components/SideBar';
import TopHeader from '@/components/TopHeader';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <SideBar />
      <div className='main-wrapper'>
        <TopHeader />
        <section className='mt-18 bg-white py-3 px-4 md:px-8 xl:px-11'>
          {children}
        </section>
      </div>
    </div>
  );
}
