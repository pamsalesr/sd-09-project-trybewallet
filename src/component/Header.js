import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenseObj } = this.props;
    const expensesData = expenseObj.map((
      { exchangeRates, currency, value },
    ) => exchangeRates[currency].ask * value);

    const total = expensesData.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);
    return (
      <header>
        <p data-testid="email-field">
          { email }
        </p>
        <span data-testid="total-field">{total.toFixed(2)}</span>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  expenseObj: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

const { string, arrayOf } = propTypes;
Header.propTypes = {
  email: string,
  expenseObj: arrayOf(Object),
};

Header.defaultProps = {
  email: '',
  expenseObj: [],
};
