import React from 'react';

import WalletHeader from './components/WalletHeader';
import WalletForm from './components/WalletForm';
import WalletTable from './components/WalletTable';
import './Wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onExpenseEdit: false,
      editedExpense: {},
    };

    this.setEditionModeOn = this.setEditionModeOn.bind(this);
  }

  setEditionModeOn(obj = {}) {
    this.setState({ onExpenseEdit: true });
    this.setState({ editedExpense: obj });
  }

  render() {
    const { onExpenseEdit, editedExpense } = this.state;
    return (
      <main className="main-wallet">
        <WalletHeader />
        <WalletForm editMode={ onExpenseEdit } editedExpense={ editedExpense } />
        <WalletTable editExpense={ this.setEditionModeOn } />
      </main>
    );
  }
}

export default Wallet;
