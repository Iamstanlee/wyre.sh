import { paymentDate } from '@/utils/date';
import { useUser } from '@/utils/use-user';
import { PaymentLinkType } from '@/utils/enum';
import { Transaction } from '@/types';

function TransactionList() {
  const { transactions } = useUser();
  console.log(transactions);

  return (
    <div className="overflow-auto">
      <table className="table-auto w-full text-black">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left min-w-max">Status</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item: Transaction) => (
            <tr className="list" key={item.id}>
              <td className="text-left">{paymentDate(item.updated_at)}</td>
              <td className="text-left min-w-max">
                <span className={`capitalize status ${item.status}`}>
                  {item.status}
                </span>
              </td>
              <td className="text-left">${item.amount}</td>
              <td className="text-left">
                {PaymentLinkType.link === item.type
                  ? 'Payment Link'
                  : 'Product Page'}
              </td>
            </tr>
          ))}

          <tr className="list">
            <td className="text-left">27 July, 2022</td>
            <td className="text-left min-w-max">
              <span className="status cancelled">Cancelled</span>
            </td>
            <td className="text-left">$500.00</td>
            <td className="text-left">Payment Link</td>
          </tr>

          <tr className="list">
            <td className="text-left ">27 July, 2022</td>
            <td className="text-left min-w-max">
              <span className="status failed">Failed</span>
            </td>
            <td className="text-left">$500.00</td>
            <td className="text-left">Payment Link</td>
          </tr>
          <tr className="list">
            <td className="text-left ">27 July, 2022</td>
            <td className="text-left min-w-max">
              <span className="status pending">Pending</span>
            </td>
            <td className="text-left">$500.00</td>
            <td className="text-left">Payment Link</td>
          </tr>
          <tr className="list">
            <td className="text-left ">27 July, 2022</td>
            <td className="text-left min-w-max">
              <span className="status success">Success</span>
            </td>
            <td className="text-left">$500.00</td>
            <td className="text-left">Payment Link</td>
          </tr>
          <tr>
            <td className="text-left">4 items</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
