import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from '../components/walletForm';

class Wallet extends React.Component {
  render() {
    const { user, totals } = this.props;
    const { email } = user;
    const { total, currency } = totals;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <span data-testid="email-field" className="user-email">
            Email:
            { email }
          </span>
          <span data-testid="total-field" className="totals-total">
            Despesa Total:&nbsp;&nbsp;&nbsp;
            { parseFloat(total).toFixed(2) }
          </span>
          <span data-testid="header-currency-field" className="totals-currency">
            { currency }
          </span>
        </header>
        <section className="wallet-form">
          <WalletForm />
        </section>
      </div>);
  }
}

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    button: PropTypes.bool,
    shouldRedirect: PropTypes.bool,
  }).isRequired,
  totals: PropTypes.shape({
    total: PropTypes.number,
    currency: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(Wallet);
