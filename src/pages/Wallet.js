import React from 'react';
import { WalletHeader, WalletForm, WalletTableOfExpenses } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <WalletForm />
        <WalletTableOfExpenses />
      </div>
    );
  }
}

export default Wallet;
