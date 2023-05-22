import TransactionList from './TransactionList';
import Search from './Search';

function UserTransaction() {
  return (
    <div className='mt-4'>
      <Search />
      <TransactionList />
    </div>
  );
}

export default UserTransaction;
