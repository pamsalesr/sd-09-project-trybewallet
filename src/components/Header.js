import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends React.Component {
  getSumExpenses() {
    const { expenses } = this.props;
    const sumExpenses = expenses.reduce((accumulator, currentValue) => {
      const { value, currency, exchangeRates } = currentValue;
      const currencyValue = exchangeRates[currency].ask;
      accumulator += (value * currencyValue);
      return accumulator;
    }, 0);
    return sumExpenses;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{ this.getSumExpenses() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
