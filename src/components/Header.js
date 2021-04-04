import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((expenseValue) => {
      sum += expenseValue.value * expenseValue.exchangeRates[expenseValue.currency].ask;
    });
    return sum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          { `Hello user ${email}` }
        </p>
        <p data-testid="total-field">{ this.totalExpenses() }</p>
        <p data-testid="header-currency-field">BRL in your account</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
