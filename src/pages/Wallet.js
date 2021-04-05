import React from 'react';
import WalletHeader from '../components/WalletHeader';
import WalletInputs from '../components/WalletInputs';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <WalletInputs />
      </>
    );
  }
}

export default Wallet;
