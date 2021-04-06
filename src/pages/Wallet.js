import React from 'react';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';
import Expenses from './Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenses />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
