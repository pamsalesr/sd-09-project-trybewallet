import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalValue = expenses.length ? Math.round(expenses
      .reduce((acc, cur) => acc + cur.value
       * cur.exchangeRates[cur.currency].ask, 0) * 100) / 100 : 0;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <p data-testid="total-field">{totalValue}</p>
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
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
