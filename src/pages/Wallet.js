import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.scss';
import logo from '../logo.svg';
import fetchCurrencies from '../api';
import walletAction from '../actions/walletAction';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      currency: '',
      method: '',
      tag: '',
      value: 0,
      selectedCurrency: 'BRL',
      loading: true,
    };
    this.renderForm = this.renderForm.bind(this);
    this.saveCurrenciesAndExpenses = this.saveCurrenciesAndExpenses.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
  }

  componentDidMount() {
    this.saveCurrenciesAndExpenses();
  }

  getTotal() {
    const { expenses } = this.props;
    const values = [];
    expenses.forEach((expense) => values
      .push(parseFloat(expense.value) * this.findExchange(expense)));
    const total = values.reduce((prev, current) => prev + current);
    return total;
  }

  findExchange(expense) {
    const rates = Object.entries(expense.exchangeRates);
    const foundRate = rates.find((rate) => rate[1].code === expense.currency)[1].ask;
    return foundRate;
  }

  async saveCurrenciesAndExpenses() {
    const { value, description, currency, method, tag } = this.state;
    let { expenses } = this.props;
    const { walletToStore } = this.props;
    const exchangeRates = await fetchCurrencies();
    const currencies = Object.keys(exchangeRates)
      .filter((currencyTag) => currencyTag !== 'USDT');
    if (description === '') {
      expenses = [];
    } else {
      expenses.push({
        id: expenses.length, value, description, currency, method, tag, exchangeRates,
      });
    }
    const wallet = { currencies, expenses };
    walletToStore(wallet);
    this.setState({ loading: false, value: 0 });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  renderCurrencies(currencies) {
    return (
      currencies.map((currency, index) => (
        <option key={ index } data-testid={ currency }>{currency}</option>
      ))
    );
  }

  renderValue(value) {
    return (
      <label htmlFor="number">
        Valor:
        <input
          name="value"
          id="number"
          type="number"
          data-testid="value-input"
          value={ value }
          min="0"
          step="0.01"
          onChange={ (evt) => this.handleChange(evt) }
        />
      </label>
    );
  }

  renderDescription(description) {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          name="description"
          type="text"
          data-testid="description-input"
          value={ description }
          onChange={ (evt) => this.handleChange(evt) }
          required
        />
      </label>
    );
  }

  renderCurrenciesList(currencies, currency) {
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ (evt) => this.handleChange(evt) }
        >
          { this.renderCurrencies(currencies) }
        </select>
      </label>
    );
  }

  renderMethod(method) {
    return (
      <label htmlFor="method-input">
        Método de Pagamento:
        <select
          id="method-input"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (evt) => this.handleChange(evt) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag(tag) {
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          data-testid="tag-input"
          id="tag-input"
          name="tag"
          value={ tag }
          onChange={ (evt) => this.handleChange(evt) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  renderForm() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="App-header">
        {this.renderValue(value)}
        {this.renderDescription(description)}
        {this.renderCurrenciesList(currencies, currency)}
        {this.renderMethod(method)}
        {this.renderTag(tag)}
        <button
          type="button"
          onClick={ this.saveCurrenciesAndExpenses }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }

  render() {
    const { email, expenses } = this.props;
    const { selectedCurrency, loading } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } alt="trybe logo" width="36px" />
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">{ email }</span>
          <div>
            <span data-testid="total-field">
              {`Despesa Total: ${expenses.length === 0 ? 0 : this.getTotal()} `}
            </span>
            <span data-testid="header-currency-field">{ selectedCurrency }</span>
          </div>
        </header>
        { loading ? <p>Carregando...</p> : this.renderForm() }
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  walletToStore: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const getState = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
const dispatchActions = (dispatch) => ({
  walletToStore: (currencies) => dispatch(walletAction(currencies)),
});

export default connect(getState, dispatchActions)(Wallet);
