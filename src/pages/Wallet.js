import React from 'react';
import { string } from 'prop-types';
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';
import NewExpense from '../components/NewExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NewExpense />
        <ExpensesTable />
      </div>);
  }
}

Wallet.propTypes = {
  email: string,
}.isRequired;

export default Wallet;
