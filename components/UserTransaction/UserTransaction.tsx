import TransactionList from './TransactionList';
import TransactionOverview from './TransactionOverview';
import Search from './Search';

function UserTransaction() {
  return (
    <>
      <TransactionOverview />
      <div className="mt-8">
        <Search />
        <TransactionList />
      </div>
    </>
  );
}

export default UserTransaction;
