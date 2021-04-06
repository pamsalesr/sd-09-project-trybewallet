import React from 'react';

import Form from '../components/Form';
import Header from '../components/Header';
import ExpenseTable from '../components/ExpenseTable';

import { getCurrencyTypes } from '../services/awesomeApi';

class Wallet extends React.Component {
  render() {
    console.log(getCurrencyTypes());
    return (
      <div>
        <Header />
        <Form />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
