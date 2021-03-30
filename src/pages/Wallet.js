import React from 'react';
import Header from '../components/Header';
import FormDispense from '../components/FormDispense';
import TableDispense from '../components/TableDispense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormDispense />
        <TableDispense />
      </div>
    );
  }
}

export default Wallet;
