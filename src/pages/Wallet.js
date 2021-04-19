import React from 'react';
import Header from '../components/Header/index';
import WalletExpenseForm from '../components/WalletExpenseForm/index';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletExpenseForm />
      </>
    );
  }
}

export default Wallet;
