import { useMemo, useState } from 'react';
import { ArrowBendUpRight } from '@phosphor-icons/react';
import { useUser } from '@/utils/use-user';
import styles from './Overview.module.css';
import Button from '../ui/Button/Button';
import { useToast } from '@/utils/use-toast';
import SvgIcon from '@/components/SvgIcon';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import TransactionList from '@/components/UserTransaction/TransactionList';
import WithdrawUSDCModal from '@/components/ui/Modal/WithdrawUSDCModal';
import * as process from 'process';

const Overview = () => {
  const { mainPaymentLink, strWalletBalance } = useUser();
  const { show } = useToast();
  const [openWithdrawUSDCModal, setOpenWithdrawUSDCModal] = useState(false);

  const handleCloseWithdrawUSDCModal = () => {
    setOpenWithdrawUSDCModal(false);
  };


  const strPaymentLink = useMemo(() => `${process.env.NODE_ENV == 'production' ? 'https://wyre-sh.vercel.app' : 'http://localhost:3000'}/pay/${mainPaymentLink?.slug}`, [mainPaymentLink]);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between'>
        <div className='flex items-start gap-2 pt-4 flex-col'>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-400'>Balance</span>
            <span className='text-lg'>{strWalletBalance}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-400'>Payment link</span>
            <span className='text-md'>{strPaymentLink}</span>
            <SvgIcon name='copy'
                     onClick={async () => {
                       await copyToClipboard(strPaymentLink);
                       show('Payment link copied to clipboard');
                     }} />
          </div>
        </div>
        <div
          className={`${styles.button_wrapper} ${styles.button_wrapper_desktop}`}
        >
          <Button
            className={styles.button}
            onClick={() => setOpenWithdrawUSDCModal(true)}
          >
            <span className='mr-1'>Withdraw USDC</span>
            <ArrowBendUpRight size={16} weight='bold' />
          </Button>
        </div>
      </div>
      <div
        className={`${styles.button_wrapper} ${styles.button_wrapper_mobile}`}
      >
        <Button className={styles.button + ' ' + styles.button_withdraw}>
          <span className='mr-1'>Withdraw USDC</span>
          <ArrowBendUpRight size={16} weight='bold' />
        </Button>
      </div>
      <h2 className='sm:text-xl'>Recent activity</h2>
      <TransactionList />
      <WithdrawUSDCModal
        isOpen={openWithdrawUSDCModal}
        close={handleCloseWithdrawUSDCModal}
      />
    </div>
  );
};

export default Overview;
