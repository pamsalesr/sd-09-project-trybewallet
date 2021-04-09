import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import HeaderWallet from '../components/HeaderWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <ExpenseForm />
      </div>
    );
  }
}

export default Wallet;
