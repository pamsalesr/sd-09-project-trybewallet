import React from 'react';

import Header from '../components/Header';
import AddSpending from '../components/AddSpending';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <AddSpending />
      </>
    );
  }
}

export default Wallet;
