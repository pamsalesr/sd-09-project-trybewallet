import React from 'react';
import WalletHeader from '../components/WalletHeader';
import WalletInputs from '../components/WalletInputs';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <WalletInputs />
        <WalletTable />
      </>
    );
  }
}

export default Wallet;
