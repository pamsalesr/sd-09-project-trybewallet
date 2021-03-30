import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormAddExpense from '../components/FormAddExpense';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    const { email, totalExpenses, currentCurrency } = this.props;
    return (
      <div>
        <header>
          <h3 data-testid="email-field">{email}</h3>
          <h3>
            <span data-testid="total-field">{totalExpenses}</span>
            {' '}
            <span data-testid="header-currency-field">{currentCurrency}</span>
          </h3>
        </header>
        <FormAddExpense />
        <ExpensesTable />
      </div>);
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.expenses.reduce(
    (prev, curr) => {
      const currencyValue = parseFloat(curr.exchangeRates[curr.currency].ask);
      const convertedValue = parseFloat(curr.value) * currencyValue;
      return prev + convertedValue;
    }, 0,
  ),
  currentCurrency: 'BRL',
});

export default connect(mapStateToProps)(Wallet);
