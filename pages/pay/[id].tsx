import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PaymentLink } from '@/types';
import useCircle from '@/utils/use-circle';
import PaymentCardComponent from '@/components/Payment/PaymentCard';
import PaymentSummary from '@/components/Payment/Summary';
import LoadingDots from '@/components/ui/LoadingDots/LoadingDots';

function PayComponent() {
  const { query: { id: link } } = useRouter();

  const [payLink, setPayLink] = useState<PaymentLink>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  const { getPaymentLink } = useCircle();

  useEffect(() => {
    getPaymentLinkInfo();
  }, [link]);

  async function getPaymentLinkInfo() {
    if (link && typeof link === 'string') {
      try {
        const payLink = await getPaymentLink(link);
        setPayLink(payLink);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else
          setError('page not found');
      }
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingDots fullScreen={true} />;
  }

  if (error) {
    return <div className='text-center'>{error}</div>;
  }

  return (
    <section className='min-h-screen'>
      <div>
        <div className='flex items-center flex-col w-full'>
          <div className='flex flex-col sm:flex-row md:justify-end w-full'>
            <PaymentSummary paymentLink={payLink as PaymentLink} />
            <PaymentCardComponent paymentLink={payLink as PaymentLink} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PayComponent;
