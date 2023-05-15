import { useState } from 'react';
import { ArrowBendUpRight, Copy, ShareFat } from '@phosphor-icons/react';

import { useUser } from '@/utils/use-user';

import styles from './Overview.module.css';
import SummaryCard from '../ui/SummaryCard/SummaryCard';
import Button from '../ui/Button/Button';
import CreatePayment from '../ui/Modal/CreatePayment';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { useToast } from '@/utils/use-toast';

const Overview = () => {
  const { user, mainPaymentLink, wallet } = useUser();
  const { show } = useToast();
  const [openCreatePaymentModal, setOpenCreatePaymentModal] = useState(false);

  const handleCloseCreatePaymentModal = () => {
    setOpenCreatePaymentModal(false);
  };


  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between'>
        <h3 className='text-xl font-medium text-black pt-4 pb-4'>Overview</h3>
        <div
          className={`${styles.button_wrapper} ${styles.button_wrapper_desktop}`}
        >
          {/*<Button*/}
          {/*  className={styles.button + ' ' + styles.button_payment_link}*/}
          {/*  onClick={() => setOpenCreatePaymentModal(true)}*/}
          {/*>*/}
          {/*  <span className='mr-1'>One-time Payment</span>*/}
          {/*  <Plus size={16} weight='bold' />*/}
          {/*</Button>*/}
          <Button className={styles.button + ' ' + styles.button_withdraw}>
            <span className='mr-1'>Withdraw USDC</span>
            <ArrowBendUpRight size={16} weight='bold' />
          </Button>
        </div>
      </div>

      <div className={styles.summary_wrapper}>
        <SummaryCard name='Available USDC Balance' amount={wallet?.balance.toString() ?? '0.00'} />
        {/* <SummaryCard name="Total USDC Earnings" amount="0" /> */}
        <div className={styles.payment_link}>
          <p className='pb-2  text-black'>Your Payment Link</p>

          <p className='mb-4 w-fit px-3 py-1 bg-primary rounded-full text-white text-sm'>
            https://wyre.sh/pay/{mainPaymentLink?.slug}
          </p>
          <div className='flex items-center gap-4 '>
            <Copy
              size={20}
              weight='bold'
              onClick={async () => {
                await copyToClipboard(
                  `https://wyre.sh/pay/${mainPaymentLink?.slug}`
                );
                show('Copied to clipboard');
              }}
            />
            <ShareFat size={20} weight='bold' />
          </div>
        </div>
      </div>

      <div
        className={`${styles.button_wrapper} ${styles.button_wrapper_mobile}`}
      >
        {/*<Button*/}
        {/*  className={styles.button + ' ' + styles.button_payment_link}*/}
        {/*  onClick={() => setOpenCreatePaymentModal(true)}*/}
        {/*>*/}
        {/*  <span className="mr-1">One-time Payment</span>*/}
        {/*  <Plus size={16} weight="bold" />*/}
        {/*</Button>*/}
        <Button className={styles.button + ' ' + styles.button_withdraw}>
          <span className='mr-1'>Withdraw USDC</span>
          <ArrowBendUpRight size={16} weight='bold' />
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
