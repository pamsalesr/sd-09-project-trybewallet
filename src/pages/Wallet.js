import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email, totalPrice } = this.props;
    return (
      <div>
        <header>TrybeWallet</header>
        <span>Email: </span>
        <span data-testid="email-field">{ email }</span>
        <span>Despesa Total: </span>
        <span data-testid="total-field">{ totalPrice || '0' }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>);
  }
}

const mapStatetoProps = (state) => ({
  email: state.user.email,
  // totalPrice: state.wallet.totalPrice,
});

Wallet.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStatetoProps)(Wallet);
