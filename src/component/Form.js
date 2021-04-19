import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesUpdate, activeEditButton, expenseInsert } from '../actions';

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
    this.pushEditValues = this.pushEditValues.bind(this);
  }

  componentDidMount() {
    this.createExchangeRatesList();
    this.pushEditValues();
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

  pushEditValues() {
    const { consultExpenses, consultExpenseId } = this.props;
    if (consultExpenses[consultExpenseId] !== undefined) {
      this.setState({
        value: consultExpenses[consultExpenseId].value,
        description: consultExpenses[consultExpenseId].description,
        currency: consultExpenses[consultExpenseId].currency,
        method: consultExpenses[consultExpenseId].method,
        tag: consultExpenses[consultExpenseId].tag,
      });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async createExpense() {
    const {
      dispatchExpensesUpdate, dispatchExpense, consultExpenses, consultEditButton,
      consultExpenseId,
    } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const idValue = consultExpenses.length;
    const expense = {
      id: idValue, value, description, currency, method, tag, exchangeRates };
    if (consultEditButton) {
      expense.id = consultExpenseId;
      expense.exchangeRates = consultExpenses.filter(
        (item) => (item.id === consultExpenseId),
      )[0].exchangeRates;
      let reNew = consultExpenses.filter((item) => (item.id < consultExpenseId));
      const reNewPos = consultExpenses.filter((item) => (item.id > consultExpenseId));
      reNew = [...reNew, expense];
      if (consultExpenses.length > consultExpenseId) {
        reNew = [...reNew, ...reNewPos];
      }
      dispatchExpensesUpdate(reNew);
    } else {
      dispatchExpense(expense);
    }
    this.setState({
      value: 0,
    });
  }

  async takeInputs() {
    const { dispatchEditButton, consultEditButton } = this.props;
    await this.createExchangeRatesList();
    this.createExpense();
    if (consultEditButton) {
      dispatchEditButton(false);
    }
  }

  renderExpenditureAdd(value) {
    return (
      <label htmlFor="expenditured-add">
        valor da despesa
        <input
          type="number"
          value={ value }
          data-testid="value-input"
          id="expenditured-add"
          name="value"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderExpenditureDescription(description) {
    return (
      <label htmlFor="expediture-description">
        descrição da despesa
        <input
          value={ description }
          data-testid="description-input"
          // id="expediture-description"
          name="description"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderRegisteredCurrency(currency) {
    return (
      <label htmlFor="registered-currency">
        moeda
        <select
          value={ currency }
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

  renderPaymentMethod(method) {
    return (
      <label htmlFor="payment-method">
        método de pagamento
        <select
          value={ method }
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

  renderExpenditureCategory(tag) {
    return (
      <label htmlFor="expenditure-category">
        categoria
        <select
          data-testid="tag-input"
          value={ tag }
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
    const { consultEditButton } = this.props;
    let textButton = '';
    if (consultEditButton) { textButton = 'Editar despesa'; } else {
      textButton = 'Adicionar despesa';
    }
    return (
      <button type="button" id="button-exp-add" onClick={ this.takeInputs }>
        { textButton }
      </button>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        { this.renderExpenditureAdd(value) }
        { this.renderExpenditureDescription(description) }
        { this.renderRegisteredCurrency(currency) }
        { this.renderPaymentMethod(method) }
        { this.renderExpenditureCategory(tag) }
        { this.renderButtonExpenditureAdd() }
      </>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  consultExpenses: wallet.expenses,
  consultEditButton: wallet.editButton,
  consultExpenseId: wallet.expenseId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(expenseInsert(expense)),
  dispatchEditButton: (editButton) => dispatch(activeEditButton(editButton)),
  dispatchExpensesUpdate: (expenses) => dispatch(expensesUpdate(expenses)),
});

Form.propTypes = {
  consultExpenses: PropTypes.func,
  dispatchExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
