import React from 'react';
import Expenditure from '../components/Expenditure';
import Expenses from '../components/Expenses';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenditure />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
