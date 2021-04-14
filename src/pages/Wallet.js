import React from 'react';

import Header from '../components/Header';
import AddSpending from '../components/AddSpending';
import SpendingTable from '../components/SpendingTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <AddSpending />
        <SpendingTable />
      </>
    );
  }
}

export default Wallet;
