import React from 'react';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import { PaymentLink } from '@/types';
import useCircle from '@/utils/use-circle';
import withLoading from '@/utils/with-loading';
import CardDetails from '@/components/Payment/CardDetails';
import Summary from '@/components/Payment/Summary';
import LoadingDots from '@/components/ui/LoadingDots/LoadingDots';

function PayComponent() {
  const router = useRouter();
  const link = router.query.id;

  const [paymentDetails, setPaymentDetails] = useState<
    PaymentLink | null | any
  >(null);
  const [isLoaading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getPaymentLink } = useCircle();

  useMemo(async () => {
    if (link) {
      console.log(link);

      setIsLoading(true);
      const details = await getPaymentLink(link);
      if (details.data) {
        setPaymentDetails(details.data);
        setIsLoading(false);
      }
      if (details.error) {
        setError(details.error.message);
        console.log(error);
        setIsLoading(false);
      }
    } else {
      setError('page not found');
    }
  }, [link]);
  if (isLoaading) {
    return <LoadingDots fullScreen={true} />;
  }

  if (error) {
    // page not found
    return <div>{error}</div>;
  }
  return (
    <section className="min-h-screen">
      <div>
        <div className="flex items-center flex-col w-full">
          <div className="flex flex-col sm:flex-row md:justify-end w-full">
            <Summary link={link} paymentDetails={paymentDetails} />
            <CardDetails paymentDetails={paymentDetails} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default withLoading(PayComponent);
