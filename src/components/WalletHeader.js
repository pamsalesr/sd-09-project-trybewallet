import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logoTrybe from '../logoTrybe.png';

class WalletHeader extends Component {
  constructor() {
    super();

    this.totalExpenses = this.totalExpenses.bind(this);
  }

  // Valeu pessoal do discord :)
  totalExpenses() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      total += (value * exchangeRates[currency].ask).toFixed(2);
    });
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <Link to="/">
          <img src={ logoTrybe } alt="Logo da Trybe" />
        </Link>

        <span>E-mail:</span>
        <span data-testid="email-field">{ email }</span>

        <span>Despesa total:</span>
        <span data-testid="total-field">{ this.totalExpenses() }</span>
        <span data-testid="header-currency-field">BRL</span>
      </>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);
