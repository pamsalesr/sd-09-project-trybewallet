import React from 'react';
import WalletHeader from '../components/Header';
import WalletExpenses from '../components/Expenses';
import WalletTable from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <WalletExpenses />
        <WalletTable />
      </>
    );
  }
}

export default Wallet;
