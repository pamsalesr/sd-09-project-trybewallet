import React from 'react';

import WalletHeader from './components/WalletHeader'
import './Wallet.css'

class Wallet extends React.Component {
  render() {
    return (
      <main className="main-wallet">
        <WalletHeader />
      </main>
    );
  }
}

export default Wallet;
