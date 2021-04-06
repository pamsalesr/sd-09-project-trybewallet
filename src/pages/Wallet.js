import React from 'react';
import Header from '../components/Header';
import Expenses from './Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
