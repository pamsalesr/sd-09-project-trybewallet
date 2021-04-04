import React from 'react';
import { HeaderWallet, FormWallet, ExpensesTable } from '../component';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <FormWallet />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
