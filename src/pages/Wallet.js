import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email, totalExpenses, currentCurrency } = this.props;
    return (
      <div>
        <header>
          <h3 data-testid="email-field">{email}</h3>
          <h3 data-testid="total-field">
            {totalExpenses}
            {' '}
            <span data-testid="header-currency-field">{currentCurrency}</span>
          </h3>
        </header>
      </div>);
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  currentCurrency: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: 0,
  currentCurrency: 'BRL',
});

export default connect(mapStateToProps)(Wallet);
