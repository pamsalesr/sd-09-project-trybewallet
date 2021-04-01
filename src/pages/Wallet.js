import React from 'react';
import FormAddWallet from '../Componentes/FormAddWallet';
import HeaderWallet from '../Componentes/HeaderWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <FormAddWallet />
      </div>
    );
  }
}

export default Wallet;
