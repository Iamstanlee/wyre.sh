import { useState } from 'react';
import { useRouter } from 'next/router';
import { X } from '@phosphor-icons/react';

import { useUser } from '@/utils/use-user';
import { useSupabase } from '@/utils/use-supabase';
import { CreatePaymentModal } from '@/types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Modal.module.css';

const CreatePayment = ({
  open,
  handleCloseCreatePaymentModal
}: CreatePaymentModal) => {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const { replace } = useRouter();

  return (
    <div
      className={open ? 'min-h-screen visible fixed' : 'hidden'}
      style={{ zIndex: 999 }}
    >
      <div
        className="hidden sm:block fixed inset-0 bg-opacity-40 transition-opacity bg-black"
        onClick={handleCloseCreatePaymentModal}
      />
      <div className="fixed top-0 sm:top-0 inset-y-0 right-0 z-20 w-full sm:w-3/4 md:w-1/2 overflow-y-auto overflow-x-hidden">
        <div className="modal-inner min-h-full bg-white px-4 sm:px-10 py-10 w-full text-darkGrey">
          <div className="flex items-center justify-between text-black">
            <h3 className="text-xl sm:text-2xl font-medium">
              Create a Payment Link
            </h3>
            <Button
              className={styles.close}
              onClick={handleCloseCreatePaymentModal}
            >
              <X weight="bold" />
            </Button>
          </div>
          <p className="pt-9 pb-6">
            To receive payments from your customers, fill form below to create a
            payment link youncan send to your customers
          </p>
          <form className="mb-10">
            <Input
              title="Amount"
              id="amount"
              value=""
              placeholder=""
              name="amount"
              type="text"
              optional={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePayment;
