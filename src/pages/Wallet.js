import React from 'react';
import Header from '../components/Header';
import WalletForms from '../components/WalletForms';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForms />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
