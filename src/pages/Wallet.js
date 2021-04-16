import React from 'react';
import { connect } from 'react-redux';

import { string, objectOf, arrayOf, func, object } from 'prop-types';
import fetchApi from '../services/api';
import { handleExchangeRates, handleAddExpense, handleDelExpense, handleEditExpense }
  from '../actions';
import './Wallet.css';

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
      editButton: false,
    };
    this.valueInput = this.valueInput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.currencyOptions = this.currencyOptions.bind(this);
    this.paymentMethod = this.paymentMethod.bind(this);
    this.categoryOptions = this.categoryOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.createHeader = this.createHeader.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.generateHeaderTable = this.generateHeaderTable.bind(this);
    this.generateExpenseResume = this.generateExpenseResume.bind(this);
  }

  async componentDidMount() {
    const { currenciesRates } = this.props;
    const currencies = await fetchApi();
    currenciesRates(currencies);
  }

  shouldComponentUpdate(nextState) {
    const currState = this.state;
    const shouldUpdate = currState.description !== nextState.description;
    return shouldUpdate;
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

  async submitExpense() {
    const currencies = await fetchApi();
    const { expenses, addExpenses, editExpenseDisp } = this.props;
    const { currency, value, description, method, tag, editButton } = this.state;
    const expense = {
      id: expenses.length,
      currency,
      value,
      description,
      method,
      tag,
      exchangeRates: currencies,
    };
    if (editButton) {
      const { id } = this.state;
      expense.id = id;
      console.log(expense);
      editExpenseDisp(expense);
    } else {
      console.log(expense);
      addExpenses(expense);
    }
    this.setState((state) => ({
      ...state,
      description: '',
      value: '',
      id: '',
      editButton: false,
    }));
  }

  totalExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => (
      acc + (curr.value * curr.exchangeRates[curr.currency].ask)
    ), 0);
    return total.toFixed(2);
  }

  createHeader() {
    const { email } = this.props;
    return (
      <header>
        <h4 data-testid="email-field">{ email }</h4>
        <div className="totalExpensesBRL">
          <h3 data-testid="total-field">{ this.totalExpenses() }</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </header>
    );
  }

  generateHeaderTable() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  generateExpenseResume() {
    const { expenses, delExpense } = this.props;
    return (
      expenses.map((
        // console.log(exchangeRates]currency);
        { value, description, currency, method, tag, exchangeRates }, index,
      ) => (
        <tr key={ index } name={ index }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ Math.round(100 * exchangeRates[currency].ask) / 100 }</td>
          <td>{ Math.round(value * 100 * (exchangeRates[currency].ask)) / 100 }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              id={ index }
              onClick={ ({ target }) => this.editExpense(target) }
            >
              Editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              id={ index }
              onClick={ () => delExpense(index) }
            >
              deletar
            </button>
          </td>
        </tr>
      ))
    );
  }

  editExpense(target) {
    const { expenses } = this.props;
    this.setState({ editButton: true });
    console.log(expenses[0].id);
    console.log(parseInt(target.id, 10));
    console.log(parseInt(target.id, 10) === expenses[0].id);
    const changeExpense = expenses
      .filter((expense) => (expense.id === parseInt(target.id, 10)));
    this.setState((state) => ({
      ...state,
      description: changeExpense[0].description,
      value: changeExpense[0].value,
      tag: changeExpense[0].tag,
      method: changeExpense[0].method,
      currency: changeExpense[0].currency,
      id: changeExpense[0].id,
      editButton: true,
    }));
  }

  changeButton() {
    const { editButton } = this.state;
    return !editButton
      ? (
        <button type="button" onClick={ this.submitExpense }>
          Adicionar despesa
        </button>
      )
      : (
        <button type="button" onClick={ this.submitExpense }>
          Editar despesa
        </button>
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
          { this.changeButton() }
        </form>
        <table>
          { this.generateHeaderTable() }
          <tbody>
            { this.generateExpenseResume() }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProp = (dispatch) => ({
  currenciesRates: (currencies) => dispatch(handleExchangeRates(currencies)),
  addExpenses: (expense) => dispatch(handleAddExpense(expense)),
  delExpense: (id) => dispatch(handleDelExpense(id)),
  editExpenseDisp: (dataState) => dispatch(handleEditExpense(dataState)),
});

const mapStateToProps = (state) => ({
  currRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
  email: state.user.email,
});

Wallet.propTypes = {
  currenciesRates: func,
  addExpenses: func,
  convertExp: func,
  currRates: objectOf(object),
  expenses: arrayOf(string),
  email: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProp)(Wallet);
