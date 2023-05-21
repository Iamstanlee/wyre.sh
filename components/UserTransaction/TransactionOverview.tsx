import { useState } from 'react';
import { ArrowBendUpRight } from '@phosphor-icons/react';

import styles from './UserTransaction.module.css';

import SummaryCard from '@/components/ui/SummaryCard/SummaryCard';
import Button from '@/components/ui/Button/Button';
import WithdrawUSDC from '../ui/Modal/WithdrawUSDC';

function TransactionOverview() {
  const [openWithdrawUSDCModal, setOpenWithdrawUSDCModal] = useState(false);

  const handleCloseWithdrawUSDCModal = () => {
    setOpenWithdrawUSDCModal(false);
  };
  return (
    <div>
      <div className="pb-4 flex items-center justify-between">
        <h3 className="text-xl font-medium text-black">Transactions</h3>
        <Button
          className={styles.button}
          onClick={() => setOpenWithdrawUSDCModal(true)}
        >
          <span className="mr-1">Withdraw USDC</span>
          <ArrowBendUpRight size={16} weight="bold" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryCard name="Balance" amount="$2,000" />
        <SummaryCard name="Total Earnings" amount="$0" />
      </div>

      <WithdrawUSDC
        open={openWithdrawUSDCModal}
        handleCloseWithdrawUSDCModal={handleCloseWithdrawUSDCModal}
      />
    </div>
  );
}

export default TransactionOverview;
