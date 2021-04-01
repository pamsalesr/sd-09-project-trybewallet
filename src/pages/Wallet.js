import React from 'react';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div>TrybeWallet</div>
        <Header />
        <ExpensesForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
