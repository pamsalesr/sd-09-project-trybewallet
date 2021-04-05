import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { user, expenses, currency } = this.props;
    return (
      <div>
        <header>
          <h1>Wallet</h1>
          <h4 data-testid="email-field">{user}</h4>
          <span data-testid="total-field">
            Despesa Total:
            {' '}
            {`${expenses}`}
          </span>
          {' '}
          <span data-testid="header-currency-field">{currency}</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currencies,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
