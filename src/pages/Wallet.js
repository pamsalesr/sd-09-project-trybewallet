import React from 'react';
import WalletExpends from '../components/WalletExpends';
import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <WalletExpends />
      </div>
    );
  }
}

export default Wallet;
