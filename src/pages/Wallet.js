import React from 'react';

import Form from '../components/Form';
import Header from '../components/Header';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
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
