import { useState, useMemo } from 'react';

import useCircle from '@/utils/use-circle';
import { PaymentLink } from '@/types';

interface SummaryProps {
  link: string | string[] | undefined;
  paymentDetails: PaymentLink | null | any;
}

const Summary = ({ link, paymentDetails }: SummaryProps) => {
  return (
    <div className="md:fixed md:top-0 md:left-0 md:h-full bg-grey-bg w-full md:w-1/2 px-6 md:px-12 lg:px-28 py-10 md:pt-20">
      <h4 className="text-black text-2xl md:text-3xl font-medium pb-6">
        Payment Link
      </h4>

      <div className="py-6">
        <p className="text-grey text-sm pb-4 font-medium">Bill From</p>
        <div>
          <p className="text-black text-sm sm:text-base font-medium">
            {paymentDetails.metadata?.user_name}
          </p>
          <p className="text-black text-sm text-grey">
            {' '}
            {paymentDetails.metadata?.user_email}
          </p>
        </div>
      </div>

      {paymentDetails?.metadata?.receiver && <div className='py-6 border-t border-border-color'>
      <p className='text-grey text-sm pb-4 font-medium'>Recipient</p>
      <div>
        <p className='text-black text-sm sm:text-base font-medium'>
          {paymentDetails.metadata.receiver}
        </p>
        <p className='text-black text-sm text-grey'>
          Description: {paymentDetails?.metadata.description}
        </p>
      </div>
    </div>}

      {paymentDetails?.amount &&<div className='flex justify-between font-medium border-t pt-3 border-border-color'>
        <p className='text-black text-sm sm:text-base'>Amount</p>
        <p className='text-black'>${paymentDetails?.amount}</p>
      </div>}
    </div>
  );
};
export default Summary;
