import React from 'react';
import Expenditure from '../components/Expenditure';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenditure />
      </div>
    );
  }
}

export default Wallet;
