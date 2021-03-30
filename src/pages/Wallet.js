import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <div className="general">
        <header>
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">
            Email: {  }
          </span>
          <span data-testid="total-field">Total: 0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}

export default Wallet;
