import React from 'react';
import FormAddWallet from '../Componentes/FormAddWallet';
import HeaderWallet from '../Componentes/HeaderWallet';
import TableWallet from '../Componentes/TableWallet';
import '../styles/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <FormAddWallet />
        <TableWallet />
      </div>
    );
  }
}

export default Wallet;
