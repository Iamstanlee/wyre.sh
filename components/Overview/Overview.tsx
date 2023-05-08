import { useState } from 'react';
import { useRouter } from 'next/router';
import { Plus, ArrowBendUpRight, Copy, ShareFat } from '@phosphor-icons/react';

import { useUser } from '@/utils/use-user';
import { useSupabase } from '@/utils/use-supabase';

import styles from './Overview.module.css';
import SummaryCard from '../ui/SummaryCard/SummaryCard';
import Button from '../ui/Button/Button';
import CreatePayment from '../ui/Modal/CreatePayment';
import useCircle from '../../utils/use-circle';

const Overview = () => {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const { replace } = useRouter();
  const [openCreatePaymentModal, setOpenCreatePaymentModal] = useState(false);
  const {} = useCircle();

  const handleCloseCreatePaymentModal = () => {
    setOpenCreatePaymentModal(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium text-black pt-4 pb-4">Overview</h3>
        <div
          className={`${styles.button_wrapper} ${styles.button_wrapper_desktop}`}
        >
          <Button
            className={styles.button + ' ' + styles.button_payment_link}
            onClick={() => setOpenCreatePaymentModal(true)}
          >
            <span className="mr-1">One-time Payment</span>
            <Plus size={16} weight="bold" />
          </Button>
          <Button className={styles.button + ' ' + styles.button_withdraw}>
            <span className="mr-1">Withdraw USDC</span>
            <ArrowBendUpRight size={16} weight="bold" />
          </Button>
        </div>
      </div>

      <div className={styles.summary_wrapper}>
        <SummaryCard name="Available USDC Balance" amount="20.00" />
        {/* <SummaryCard name="Total USDC Earnings" amount="0" /> */}
        <div className={styles.payment_link}>
          <p className="pb-2  text-black">Your Payment Link</p>

          <p className="mb-4 px-2 bg-primary rounded-full  text-white text-sm">
            https://xula.com/pay/{user?.username}
          </p>
          <div className="flex items-center gap-4 ">
            <Copy size={20} weight="bold" />
            <ShareFat size={20} weight="bold" />
          </div>
        </div>
      </div>

      <div
        className={`${styles.button_wrapper} ${styles.button_wrapper_mobile}`}
      >
        <Button
          className={styles.button + ' ' + styles.button_payment_link}
          onClick={() => setOpenCreatePaymentModal(true)}
        >
          <span className="mr-1">One-time Payment</span>
          <Plus size={16} weight="bold" />
        </Button>
        <Button className={styles.button + ' ' + styles.button_withdraw}>
          <span className="mr-1">Withdraw USDC</span>
          <ArrowBendUpRight size={16} weight="bold" />
        </Button>
      </div>

      <CreatePayment
        open={openCreatePaymentModal}
        handleCloseCreatePaymentModal={handleCloseCreatePaymentModal}
      />
    </div>
  );
};

export default Overview;
