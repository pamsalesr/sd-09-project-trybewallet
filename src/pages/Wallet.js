import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewInput from './NewInput';

class Wallet extends React.Component {
  calculateTotalExpenses() {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    const convertedTotal = expenses.reduce((acc, curr) => {
      const expenseRate = curr.exchangeRates[curr.currency].ask;
      const convertedExpense = Number(expenseRate) * Number(curr.value);
      return acc + convertedExpense;
    }, 0);
    return convertedTotal.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <NewInput />
        <header>
          <span data-testid="email-field">{ email }</span>
          <span
            data-testid="total-field"
          >
            { this.calculateTotalExpenses() }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Wallet);
