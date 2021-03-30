import React from 'react';
import Header from '../components/Header';
import AddExpense from '../components/AddExpense';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <AddExpense />
        <TableExpenses />
      </>
    );
  }
}

export default Wallet;
