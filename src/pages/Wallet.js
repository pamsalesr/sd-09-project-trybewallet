import React from 'react';
import HeaderWallet from '../components/HeaderWallet';
// import ExpensesTable from '../components/ExpensesTable';
import FormWallet from '../components/FormWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <FormWallet />
        {/* <ExpensesTable /> */}
      </div>
    );
  }
}

export default Wallet;
