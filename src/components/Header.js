import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'BRL',
    };

    this.calculateExpense = this.calculateExpense.bind(this);
  }

  calculateExpense(expenses) {
    const totalExpenses = expenses.reduce(
      (total, { currency, value, exchangeRates }) => {
        total += value * exchangeRates[currency].ask;
        return total;
      },
      0.0,
    );

    return totalExpenses.toFixed(2);
  }

  render() {
    const { currency } = this.state;
    const { userEmail, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          {userEmail}
        </p>
        <p data-testid="total-field">
          Despesa Total:
          { this.calculateExpense(expenses) }
        </p>
        <p data-testid="header-currency-field">
          Câmbio utilizado:
          {currency}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
