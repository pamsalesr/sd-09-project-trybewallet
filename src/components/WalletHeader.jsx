import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  constructor(props) {
    super(props);
    const { userLogedIn } = this.props;
    this.state = { email: userLogedIn, currencyField: 'BRL' };
  }

  getSumOfCurrencies() {
    const { expensesList } = this.props;
    let sum = 0;
    if (expensesList) {
      sum = expensesList.reduce((acc, expenseValue) => {
        const { currency, exchangeRates } = expenseValue;
        const currencyFound = exchangeRates[currency];
        const ask = currencyFound;
        acc += parseFloat(expenseValue.value) * ask.ask;
        return acc;
      }, 0);
    }
    return sum;
  }

  render() {
    const { email, currencyField } = this.state;
    const totalValue = this.getSumOfCurrencies();
    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{email}</p>
        <p>
          Despesa Total:
          <span data-testid="total-field">{ totalValue }</span>
          <span data-testid="header-currency-field">{currencyField}</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  { userLogedIn: state.user.email,
    expensesList: state.wallet.expenses,
  }
);

WalletHeader.propTypes = {
  userLogedIn: PropTypes.string,
  expensesList: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(WalletHeader);
