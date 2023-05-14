import { X } from '@phosphor-icons/react';

import { PaymentCreatedModal } from '@/types';
import Button from '../Button/Button';
import styles from './Modal.module.css';

const PaymentCreated = ({
  open,
  handleClosePaymentCreatedModal,
  status
}: PaymentCreatedModal) => {
  return (
    <div
      className={open ? 'min-h-screen visible fixed' : 'hidden'}
      style={{ zIndex: 999 }}
    >
      <div
        className=" fixed inset-0 bg-opacity-40 transition-opacity bg-black"
        onClick={handleClosePaymentCreatedModal}
      />
      <div className="fixed inset-0 m-auto z-20 w-full max-w-sm h-fit rounded bg-white px-4 sm:px-8 pb-10 w-full text-darkGrey">
        <div className="flex items-center justify-end text-black">
          <Button
            className={`${styles.close} -mr-4 sm:-mr-8`}
            onClick={handleClosePaymentCreatedModal}
          >
            <X weight="bold" />
          </Button>
        </div>
        <h3 className="text-xl sm:text-2xl text-center font-medium pt-6 pb-3 text-black">
          Payment was Initiated
        </h3>
        <p className="pb-6 text-center text-sm">
          Once your payment is successful we will let you know!
        </p>

        <div className="mt-2 flex flex-col items-center gap-4">
          <p className="mx-auto w-fit px-3 py-1 bg-primary rounded-full text-white text-sm">
            {status}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PaymentCreated;
