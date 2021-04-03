import React from 'react';
import { HeaderWallet, FormWallet } from '../component';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <FormWallet />
      </div>
    );
  }
}

export default Wallet;
