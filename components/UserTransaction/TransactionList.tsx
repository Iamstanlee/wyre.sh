import { useUser } from '@/utils/use-user';
import { PaymentLinkType } from '@/utils/enum';
import { Transaction } from '@/types';
import { useCurrencyFormatter, useDateFormatter } from '@/utils/use-intl';

function TransactionList() {
  const { transactions } = useUser();
  const dateFormatter = useDateFormatter();

  return (
    <div className='overflow-auto'>
      <table className='table-auto w-full text-black'>
        <thead>
        <tr>
          <th className='text-left'>ID</th>
          <th className='text-left'>Date</th>
          <th className='text-left min-w-max'>Status</th>
          <th className='text-left'>Amount</th>
          <th className='text-left'>Type</th>
        </tr>
        </thead>
        <tbody>
        {transactions.map((item: Transaction) => {
          const currencyFormatter = useCurrencyFormatter(item.amount.currency);

          return (
            <tr className='list' key={item.id}>
              <td className='text-left'>{item.id.slice(0, 12)}...</td>
              <td className='text-left'>{dateFormatter.format(new Date(item.updated_at))}</td>
              <td className='text-left min-w-max'>
                <span className={`text-xs status ${item.status}`}>
                  {item.status.toUpperCase()}
                </span>
              </td>
              <td className='text-left'>{currencyFormatter.format(parseFloat(item.amount.amount))}</td>
              <td className='text-left'>
                {PaymentLinkType.link === item.type
                  ? 'Payment Link'
                  : 'Product Page'}
              </td>
            </tr>
          );
        })}
        <tr>
          <td className='text-left'>{transactions.length} items</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
