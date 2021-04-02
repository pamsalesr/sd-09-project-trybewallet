import React from 'react';
import FormAddWallet from '../Componentes/FormAddWallet';
import HeaderWallet from '../Componentes/HeaderWallet';
import TableWallet from '../Componentes/TableWallet';
import '../styles/wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);

    this.state = { statusEdit: false };
  }

  handleEdit(status, idEdit = undefined) {
    this.setState({ statusEdit: status, idEdit });
  }

  render() {
    const { statusEdit, idEdit } = this.state;
    return (
      <div>
        <HeaderWallet />
        <FormAddWallet
          statusEdit={ statusEdit }
          idEdit={ idEdit }
          handleEdit={ this.handleEdit }
        />
        <TableWallet handleEdit={ this.handleEdit } />
      </div>
    );
  }
}

export default Wallet;
