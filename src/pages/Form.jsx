import React from 'react';
import { connect } from 'react-redux';
import fetchApi from '../services/api';
import { handleExchangeRates, handleAddExpense, handleConvertExpense } from '../actions';
import { } from 'prop-types';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description:'',
      value: 0,
      tag: 'food',
      method: 'Dinheiro',
      currency: 'USD',
      id: '',
    };
    this.valueInput = this.valueInput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.currencyOptions = this.currencyOptions.bind(this);
    this.paymentMethod = this.paymentMethod.bind(this);
    this.categoryOptions = this.categoryOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createExpense = this.createExpense.bind(this);
  }

  async componentDidMount() {
    const { currenciesRates } = this.props;
    const currencies = await fetchApi();
    currenciesRates(currencies);
  }

  async fetchCurrency() {
    const currencies = await fetchApi();
  }

  handleChange({ target }) {
    const { id, value } = target
    this.setState ({ [id]: value })
  }

  valueInput() {
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          id="value"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  descriptionInput() {
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          data-testid="description-input"
          id="description"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyOptions() {
    const { currRates } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          type="text"
          data-testid="currency-input"
          id="currency"
          onChange={this.handleChange}
        >
          {Object.keys(currRates).map((curr) => (
            <option
              data-testid={ curr }
              key={ curr }
              value={ curr }
              id={ curr }
            >
              { curr }
            </option>
          ))}
        </select>
      </label>
    );
  }

  paymentMethod() {
    return (
      <label htmlFor="method">
        Método de Pagamento
        <select
          data-testid="method-input"
          id="method"
          onChange={ this.handleChange }
        >
          <option key="money" value="Dinheiro">Dinheiro</option>
          <option key="credit-card" value="Crédito">Cartão de Crédito</option>
          <option key="debit-card" value="Débito">Cartão de Débito</option>
        </select>
      </label>
    );
  }

  categoryOptions() {
    return (
      <label htmlFor="tag">
        Categoria
        <select
          data-testid="tag-input"
          id="tag"
          onChange={ this.handleChange }
        >
          <option key="food" value="food">Alimentação</option>
          <option key="fun" value="fun">Lazer</option>
          <option key="work" value="work">Trabalho</option>
          <option key="transport" value="transport" >Transporte</option>
          <option key="health" value="health">Saúde</option>
        </select>
      </label>
    );
  }

  async createExpense() {
    const currencies = await fetchApi();
    const { expensesMap, addExpenses, convertExp } = this.props
    const { currency, value, description, method, tag } = this.state;
    const expense = {
      id: expensesMap.length,
      currency,
      value,
      description,
      method,
      tag,
      exchangeRates: currencies,
    }
    addExpenses(expense);
    const expenseRealPrice = parseFloat(currencies[currency].ask)*expense.value;
    console.log(expenseRealPrice);
    convertExp(expenseRealPrice);
  }

  render() {
    return (
      <form>
        { this.valueInput() }
        { this.descriptionInput() }
        { this.currencyOptions() }
        { this.paymentMethod() }
        { this.categoryOptions() }
        <button
          type="button"
          onClick={this.createExpense}
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProp = (dispatch) => ({
  currenciesRates: (currencies) => dispatch(handleExchangeRates(currencies)),
  addExpenses: (expense) => dispatch(handleAddExpense(expense)),
  convertExp: (value) => dispatch(handleConvertExpense(value)),
});

const mapStateToProps = (state) => ({
  currRates: state.wallet.exchangeRates,
  expensesMap: state.wallet.expenses,
});

export default connect(mapStateToProps,mapDispatchToProp)(Form);
