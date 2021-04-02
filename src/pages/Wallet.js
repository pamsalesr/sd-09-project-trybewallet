import React from 'react';
import WalletHeader from '../components/WalletHeader';
import AddExpenseForms from '../components/AddExpenseForms';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <AddExpenseForms />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
