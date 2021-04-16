import React from 'react';
import Header from '../components/Header';
import RegisterExpense from '../components/RegisterExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <RegisterExpense />
      </div>
    );
  }
}

export default Wallet;
