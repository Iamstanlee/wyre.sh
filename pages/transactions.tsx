import React from 'react';
import withLoading from '@/utils/with-loading';
import { today } from '@/utils/date';
import Layout from '@/components/Layout';
import { useUser } from '@/utils/use-user';
import Link from 'next/link';
import SummaryCard from '@/components/ui/SummaryCard/SummaryCard';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

function TransactionComponent() {
  return (
    <Layout>
      

      <div >
        <div className="pb-4 flex items-center justify-between">
          <h3 className="text-xl font-medium text-black">Transactions</h3>
          <Button variant='slim' className=" flex items-center font-medium rounded-lg pl-5 py-2  text-black">
            Withdraw Earnings
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SummaryCard name="Balance" amount="$2,000" />
          <SummaryCard name="Total Earnings" amount="$0" />
        </div>
      </div>
      <div className="mt-8">
        <Input
          name="search"
          optional={true}
          id="search"
          type="text"
          placeholder="Search payments by number, items, client name or email..."
          className="border-none border-b border-border-color"
        />
        <div className="overflow-auto">
          <table className="table-auto w-full text-black">
            <thead>
              <tr>
                <th className="text-left">Invoice</th>
                <th className="text-left hidden sm:block">Payment date</th>
                <th className="text-left min-w-max">Status</th>
                <th className="text-left">Client</th>
                <th>Amount Paid</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="list">
                <td className="text-left">#RC787024</td>
                <td className="text-left hidden sm:block">27 July, 2022</td>
                <td className="text-left min-w-max">
                  <span className="status not_sent">Not Sent</span>
                </td>
                <td className="text-left">Samantha Tino</td>
                <td>$500.00</td>
                <td>Resend Receipt</td>
              </tr>
              <tr className="list">
                <td className="text-left">#RC787025</td>
                <td className="text-left hidden sm:block">28 July, 2022</td>
                <td className="text-left min-w-max">
                  <span className="status unpaid">Unpaid</span>
                </td>
                <td className="text-left">Oghenechovwe Ufuoma</td>
                <td>$500.00</td>
                <td>Resend Receipt</td>
              </tr>
              <tr className="list">
                <td className="text-left">#RC787026</td>
                <td className="text-left hidden sm:block">29 July, 2022</td>
                <td className="text-left min-w-max">
                  <span className="status paid">Paid</span>
                </td>
                <td className="text-left">Shining Star</td>
                <td>$500.00</td>
                <td>Resend Receipt</td>
              </tr>
              <tr>
                <td className="text-left">3 items</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default withLoading(TransactionComponent);
