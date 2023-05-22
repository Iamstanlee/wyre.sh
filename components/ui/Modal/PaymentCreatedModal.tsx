import { X } from '@phosphor-icons/react';
import Button from '../Button/Button';
import styles from './Modal.module.css';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const PaymentCreatedModal = ({ isOpen, close }: Props) => {
  return (
    <div
      className={isOpen ? 'min-h-screen visible fixed' : 'hidden'}
      style={{ zIndex: 999 }}
    >
      <div
        className=' fixed inset-0 bg-opacity-40 transition-opacity bg-black'
        onClick={close}
      />
      <div
        className='fixed inset-0 m-auto z-20 w-full max-w-sm h-fit rounded bg-white px-4 sm:px-8 pb-10 text-darkGrey'>
        <div className='flex items-center justify-end text-black'>
          <Button
            className={`${styles.close} -mr-4 sm:-mr-8`}
            onClick={close}
          >
            <X weight='bold' />
          </Button>
        </div>
        <h3 className='text-xl sm:text-2xl text-center font-medium pt-6 pb-3 text-black'>
          Payment Successful 🎉
        </h3>
        <p className='pb-6 text-center text-sm'>
          Your payment was successful, you will receive a confirmation email shortly.
        </p>
      </div>
    </div>
  );
};
export default PaymentCreatedModal;
