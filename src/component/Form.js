import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseInsert } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.createExchangeRatesList = this.createExchangeRatesList.bind(this);
    this.takeInputs = this.takeInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.createExchangeRatesList();
  }

  async fetchApiDoletas() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    return fetch(endpoint)
      .then((coins) => coins.json())
      .catch(Error);
  }

  async createExchangeRatesList() {
    const list = await this.fetchApiDoletas();
    delete list.USDT;
    delete list.DOGE;
    this.setState({
      exchangeRates: list,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  createExpense() {
    const { dispatchExpense, consultExpenses } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const expense = {
      id: consultExpenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatchExpense(expense);
    this.setState({
      value: 0,
    });
  }

  async takeInputs() {
    await this.createExchangeRatesList();
    this.createExpense();
  }

  renderExpenditureAdd(value) {
    return (
      <label htmlFor="expenditured-add">
        valor da despesa
        <input
          type="text"
          value={ value }
          data-testid="value-input"
          id="expenditured-add"
          name="value"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderExpenditureDescription() {
    return (
      <label htmlFor="expediture-description">
        descrição da despesa
        <input
          data-testid="description-input"
          id="expediture-description"
          name="description"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderRegisteredCurrency() {
    return (
      <label htmlFor="registered-currency">
        moeda
        <select
          data-testid="currency-input"
          id="registered-currency"
          name="currency"
          onChange={ this.handleChange }
        >
          <option data-testid="USD" value="USD">USD</option>
          <option data-testid="CAD" value="CAD">CAD</option>
          <option data-testid="EUR" value="EUR">EUR</option>
          <option data-testid="GBP" value="GBP">GBP</option>
          <option data-testid="ARS" value="ARS">ARS</option>
          <option data-testid="BTC" value="BTC">BTC</option>
          <option data-testid="LTC" value="LTC">LTC</option>
          <option data-testid="JPY" value="JPY">JPY</option>
          <option data-testid="CHF" value="CHF">CHF</option>
          <option data-testid="AUD" value="AUD">AUD</option>
          <option data-testid="CNY" value="CNY">CNY</option>
          <option data-testid="ILS" value="ILS">ILS</option>
          <option data-testid="ETH" value="ETH">ETH</option>
          <option data-testid="XRP" value="XRP">XRP</option>
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    return (
      <label htmlFor="payment-method">
        método de pagamento
        <select
          data-testid="method-input"
          id="payment-method"
          name="method"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderExpenditureCategory() {
    return (
      <label htmlFor="expenditure-category">
        categoria
        <select
          data-testid="tag-input"
          id="expenditure-category"
          name="tag"
          onChange={ this.handleChange }
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

  renderButtonExpenditureAdd() {
    return (
      <button
        type="button"
        id="button-expenditure-add"
        onClick={ this.takeInputs }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { value } = this.state;
    return (
      <form>
        { this.renderExpenditureAdd(value) }
        { this.renderExpenditureDescription() }
        { this.renderRegisteredCurrency() }
        { this.renderPaymentMethod() }
        { this.renderExpenditureCategory() }
        { this.renderButtonExpenditureAdd() }
      </form>
    );
  }
}

const mapStateToprops = ({ wallet }) => ({
  consultExpenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (email) => dispatch(expenseInsert(email)),
});

Form.propTypes = {
  consultExpenses: PropTypes.func.isRequired,
  dispatchExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToprops, mapDispatchToProps)(Form);
