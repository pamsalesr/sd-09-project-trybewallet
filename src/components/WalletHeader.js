import React from 'react';
import store from '../store';

class WalletHeader extends React.Component {
  render() {
    const { user: { email } } = store.getState();
    return (
      <header>
        <h1>TRYBE</h1>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

export default WalletHeader;
