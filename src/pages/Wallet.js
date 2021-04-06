import React, { Component } from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
