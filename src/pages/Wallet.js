import React from 'react';
import { WalletHeader, WalletForm } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
