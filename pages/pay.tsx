import React from 'react';
import withLoading from '@/utils/with-loading';
import CardDetails from '@/components/Payment/CardDetails';

function PayComponent() {
  return (
    <section className="min-h-screen">
      {/* show a loader when fetching payment data */}
      <div>
        <div className="flex items-center flex-col w-full">
          <div className="flex flex-col sm:flex-row md:justify-end w-full">
            <div className="md:fixed md:top-0 md:left-0 md:h-full bg-grey-bg w-full md:w-1/2 px-6 md:px-12 lg:px-28 py-10 md:pt-20">
              <h4 className="text-black text-2xl md:text-3xl font-medium pb-6">
                Payment Link
              </h4>

              <div className="py-6">
                <p className="text-black text-sm sm:text-base pb-4 font-medium">
                  Bill From
                </p>
                <div>
                  <p className="text-black text-sm sm:text-base font-medium">
                    Ufuoma Oghenechovwe
                  </p>
                  <p className="text-black text-sm text-grey">
                    rukkiechowe@gamil.com
                  </p>
                </div>
              </div>

              <div className="flex justify-between font-medium border-t pt-3 border-border-color">
                <p className="text-black text-sm sm:text-base">Amount</p>
                <p className="text-black">$50</p>
              </div>
              <div className="py-6 text-sm sm:text-base">
                <p className="text-black font-medium pb-3">Note</p>
                <p className="text-black text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <CardDetails />
          </div>
        </div>
      </div>
    </section>
  );
}

export default withLoading(PayComponent);
