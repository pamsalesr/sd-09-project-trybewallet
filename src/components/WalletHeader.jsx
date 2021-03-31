import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCurrencyField } from '../actions';

class WalletHeader extends React.Component {
  constructor(props) {
    super(props);
    const { userLogedIn } = this.props;
    this.state = { email: userLogedIn };

    this.getSumOfCurrencies = this.getSumOfCurrencies.bind(this);
  }

  getSumOfCurrencies() {
    const { expenses } = this.props;
    let sum = 0;
    if (expenses) {
      sum = expenses.reduce((acc, expenseValue) => {
        const { currency, exchangeRates } = expenseValue;
        const currencyFound = exchangeRates[currency];
        const ask = currencyFound;
        acc += parseFloat(expenseValue.value) * ask.ask;
        return acc;
      }, 0);
    }
    const sumRounded = Math.round(sum * 100) / 100;
    return sumRounded;
  }

  handleChange(event) {
    const { updateCurrencyFieldDispatch } = this.props;
    updateCurrencyFieldDispatch(event.target.value);
    this.getSumOfCurrencies();
  }

  createJSXDropdownCurrency() {
    const { currencies } = this.props;
    const filteredCurrencies = currencies.filter((removeCurr) => removeCurr !== 'USDT');
    filteredCurrencies.unshift('BRL');
    return (
      <select
        id="currency-field"
        name="currency-field"
        data-testid="header-currency-field"
        onChange={ (event) => this.handleChange(event) }
      >
        {filteredCurrencies.map((currency) => (
          <option
            key={ currency }
            value={ currency }
          >
            {currency}
          </option>))}
      </select>
    );
  }

  render() {
    const { email } = this.state;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{email}</p>
        <p>
          Despesa Total:
          <span data-testid="total-field">{ this.getSumOfCurrencies() }</span>
          {this.createJSXDropdownCurrency()}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  { userLogedIn: state.user.email,
    expenses: state.wallet.expenses,
    currencyField: state.wallet.currencyField,
    currencies: state.wallet.currencies,
    exchangesRatesHolder: state.wallet.exchangesRatesHolder,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    updateCurrencyFieldDispatch: (currency) => dispatch(updateCurrencyField(currency)),
  }
);

WalletHeader.propTypes = {
  userLogedIn: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencyField: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletHeader);
