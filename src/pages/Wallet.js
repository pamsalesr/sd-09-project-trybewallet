import React from 'react';
import {
  WalletExpenseForm,
  WalletExpenseHeader,
  WalletExpensesTable } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletExpenseHeader />
        <WalletExpenseForm />
        <WalletExpensesTable />
      </>
    );
  }
}

export default Wallet;
