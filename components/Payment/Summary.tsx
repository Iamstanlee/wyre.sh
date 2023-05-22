import { PaymentLink } from '@/types';

interface props {
  paymentLink: PaymentLink;
}

const PaymentSummary = ({ paymentLink }: props) => {
  return (
    <div
      className='md:fixed md:top-0 md:left-0 md:h-full bg-grey-bg w-full md:w-1/2 px-6 md:px-12 lg:px-28 py-10 md:pt-20'>
      <div className='py-6'>
        <p className='text-grey text-sm pb-4 font-medium'>Pay</p>
        <div>
          <p className='text-black text-sm sm:text-base font-medium'>
            {paymentLink.metadata?.user_name}
          </p>
          <p className='text-black text-sm'>
            {' '}
            {paymentLink.metadata?.user_email}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PaymentSummary;
