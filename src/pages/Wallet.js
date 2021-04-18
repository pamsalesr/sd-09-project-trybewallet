import React from 'react';
import Header from '../components/Header/index';
import TransactionForm from '../components/TransactionForm/index';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <TransactionForm />
      </>
    );
  }
}

export default Wallet;
