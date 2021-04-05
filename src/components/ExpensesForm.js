import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies,
  addInfos } from '../actions/economiaApiAction';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.state = {
      currency: 'USD',
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.renderCurrenciesDropdown = this.renderCurrenciesDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderPaymentMethodsDropdown = this.renderPaymentMethodsDropdown.bind(this);
    this.renderTagDropdown = this.renderTagDropdown.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.fetchExchangeInfos = this.fetchExchangeInfos.bind(this);
  }

  async componentDidMount() {
    const { getCurrenciesInfo } = this.props;
    await getCurrenciesInfo();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async fetchExchangeInfos() {
    const responseApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeInfos = await responseApi.json();
    return exchangeInfos;
  }

  async sendInfo() {
    const { currency, value, description, method, tag } = this.state;
    const { expensesState,
      addInfosDispatch } = this.props;
    const currentId = Object.keys(expensesState).length;
    const exchangeInfos = await this.fetchExchangeInfos();
    const allInfos = {
      id: currentId,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: exchangeInfos,
    };
    let currentExpense = value * allInfos.exchangeRates[currency].ask;
    currentExpense = Math.round(currentExpense * 100) / 100;
    addInfosDispatch(allInfos, currentExpense);
    this.setState({
      currency: 'USD',
      value: 0,
      description: '',
      method: 'Dinheiro',
      tag: 'Lazer',
    });
  }

  renderCurrenciesDropdown() {
    const { currenciesState } = this.props;
    const currenciesList = currenciesState;
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        <select
          name="currency"
          id="currency-input"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {currenciesList.map((currentCurrency, keyIndex) => (
            <option
              value={ currentCurrency }
              data-testid={ currentCurrency }
              key={ keyIndex }
            >
              {currentCurrency}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderPaymentMethodsDropdown() {
    const { method } = this.state;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method-input">
        <select
          name="method"
          id="method-input"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          {paymentMethods.map((methodSelected, keyIndex) => (
            <option value={ methodSelected } key={ keyIndex }>{methodSelected}</option>))}
        </select>
      </label>
    );
  }

  renderTagDropdown() {
    const { tag } = this.state;
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag-input">
        <select
          name="tag"
          id="tag-input"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          {tagOptions.map((tagSelected, keyIndex) => (
            <option value={ tagSelected } key={ keyIndex }>{tagSelected}</option>))}
        </select>
      </label>
    );
  }

  render() {
    const { value, description } = this.state;
    // const { getCurrenciesInfo } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          <input
            name="value"
            value={ value }
            id="value-input"
            data-testid="value-input"
            onChange={ this.handleChange }
            placeholder="50"
          />
        </label>
        <label htmlFor="description-input">
          <input
            name="description"
            value={ description }
            id="description-input"
            data-testid="description-input"
            onChange={ this.handleChange }
            placeholder="Netflix subscription"
          />
        </label>
        {this.renderCurrenciesDropdown()}
        {this.renderPaymentMethodsDropdown()}
        {this.renderTagDropdown()}
        <button type="button" onClick={ this.sendInfo }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesInfo: () => dispatch(fetchCurrencies()),
  addInfosDispatch: (infos, currentExpense) => dispatch(addInfos(infos, currentExpense)),
});

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
  exchangeRateState: state.wallet.exchangeRate,
  currenciesState: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  getCurrenciesInfo: PropTypes.func.isRequired,
  addInfosDispatch: PropTypes.func.isRequired,
  // fetchExchangesDispatch: PropTypes.func.isRequired,
  expensesState: PropTypes.shape({}).isRequired,
  exchangeRateState: PropTypes.shape({}).isRequired,
  currenciesState: PropTypes.shape([]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
