import React from 'react';
import WalletExpends from '../components/WalletExpends';
import WalletHeader from '../components/WalletHeader';
import TableExpends from '../components/TableExpends';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <WalletExpends />
        <TableExpends />
      </div>
    );
  }
}

export default Wallet;
