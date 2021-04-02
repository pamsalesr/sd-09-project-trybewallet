import React from 'react';

import WalletHeader from './components/WalletHeader';
import WalletForm from './components/WalletForm';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <main className="main-wallet">
        <WalletHeader />
        <WalletForm />
      </main>
    );
  }
}

export default Wallet;
