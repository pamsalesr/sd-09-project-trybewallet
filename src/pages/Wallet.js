import React from 'react';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';
import AddNewExpense from '../components/AddNewExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddNewExpense />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
