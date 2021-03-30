import React from 'react';
import Header from '../components/Header';
import FormDispense from '../components/FormDispense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormDispense />
      </div>
    );
  }
}

export default Wallet;
