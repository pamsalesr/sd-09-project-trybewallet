import React from 'react';
import WalletHeader from '../components/WalletHeader';
import AddExpenseForms from '../components/AddExpenseForms';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <AddExpenseForms />
      </div>
    );
  }
}

export default Wallet;
