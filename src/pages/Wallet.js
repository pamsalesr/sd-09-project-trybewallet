import React from 'react';
import { connect } from 'react-redux';
import { func, string, objectOf, arrayOf, object } from 'prop-types';
import fetchApi from '../services/api';
import { handleExchangeRates, handleAddExpense } from '../actions';
import TableExpenses from './TableExpenses';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      value: 0,
      tag: 'Alimentação',
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
    this.createHeader = this.createHeader.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  async componentDidMount() {
    const { currenciesRates } = this.props;
    const currencies = await fetchApi();
    currenciesRates(currencies);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          id="value"
          onChange={ this.handleChange }
          value={ value }
        />
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descriçao
        <input
          type="text"
          data-testid="description-input"
          id="description"
          onChange={ this.handleChange }
          value={ description }
        />
      </label>
    );
  }

  currencyOptions() {
    const { currRates } = this.props;
    if (currRates !== undefined) {
      return (
        <label htmlFor="currency">
          Moeda
          <select
            type="text"
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
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
          <option key="credit-card" value="Cartão de crédito">Cartão de crédito</option>
          <option key="debit-card" value="Cartão de débito">Cartão de débito</option>
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
          <option key="food" value="Alimentação">Alimentação</option>
          <option key="fun" value="Lazer">Lazer</option>
          <option key="work" value="Trabalho">Trabalho</option>
          <option key="transport" value="Transporte">Transporte</option>
          <option key="health" value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  async createExpense() {
    const currencies = await fetchApi();
    const { expensesMap, addExpenses } = this.props;
    const { currency, value, description, method, tag } = this.state;
    const expense = {
      id: expensesMap.length,
      currency,
      value,
      description,
      method,
      tag,
      exchangeRates: currencies,
    };
    addExpenses(expense);
    // const expenseRealPrice = parseFloat(currencies[currency].ask) * expense.value;
    this.setState((state) => ({
      ...state,
      description: '',
      value: 0,
    }));
  }

  totalExpenses() {
    const { expensesMap } = this.props;
    const total = expensesMap.reduce((acc, curr) => (
      acc + (curr.value * curr.exchangeRates[curr.currency].ask)
    ), 0);
    return total.toFixed(2);
  }

  createHeader() {
    const { email } = this.props;
    return (
      <header>
        <h4 data-testid="email-field">{ email }</h4>
        <h3 data-testid="total-field">{ this.totalExpenses() }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }

  render() {
    return (
      <div>
        { this.createHeader() }
        <form>
          { this.valueInput() }
          { this.descriptionInput() }
          { this.currencyOptions() }
          { this.paymentMethod() }
          { this.categoryOptions() }
          <button
            type="button"
            onClick={ this.createExpense }
          >
            Adicionar despesa
          </button>
        </form>
        <TableExpenses />
      </div>
    );
  }
}

const mapDispatchToProp = (dispatch) => ({
  currenciesRates: (currencies) => dispatch(handleExchangeRates(currencies)),
  addExpenses: (expense) => dispatch(handleAddExpense(expense)),
});

const mapStateToProps = (state) => ({
  currRates: state.wallet.exchangeRates,
  expensesMap: state.wallet.expenses,
  email: state.user.email,
});

Wallet.propTypes = {
  currenciesRates: func,
  addExpenses: func,
  convertExp: func,
  currRates: objectOf(object),
  expensesMap: arrayOf(string),
  email: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProp)(Wallet);
