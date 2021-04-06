import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrencies, addExpenses, editExpenses, setExpenses } from '../actions';
import fetchCurrency from '../services/currencyApi';
import ExpensesList from './ExpensesList';
import './expenseforms.css';

class ExpenseForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: 'Hot Dog',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.fetchFilteredCurrencies = this.fetchFilteredCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.inputText = this.inputText.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.inputTag = this.inputTag.bind(this);
    this.handleExpenseChange = this.handleExpenseChange.bind(this);
  }

  componentDidMount() {
    this.fetchFilteredCurrencies();
  }

  fetchFilteredCurrencies() {
    const { getCurrencies } = this.props;
    fetchCurrency()
      .then((currencies) => getCurrencies(Object.keys(currencies)));
  }

  async handleClick() {
    const fetch = await fetchCurrency();
    const { getExpenses, expenses } = this.props;
    const expense = { id: expenses.length, ...this.state, exchangeRates: fetch };
    await getExpenses(expense);
    this.setState({
      value: 0,
      description: 'Hot Dog',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleExpenseChange() {
    const { expensesList, editExpense, expenses, expense } = this.props;
    const { id, exchangeRates } = expense;
    const changeExpense = { ...this.state, id, exchangeRates };
    const changed = expenses.map((list) => (list.id === id ? changeExpense : list));
    expensesList(changed);
    editExpense(false);
    this.setState({ value: 0,
      description: 'Hot Dog',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    });
  }

  currencyInputDropDown(currencies) {
    return (
      <select
        data-testid="currency-input"
        onChange={ this.handleChange }
        name="currency"
      >
        { currencies.map((currency) => (
          <option
            key={ currency }
            data-testid={ currency }
          >
            {currency}
          </option>
        )) }
      </select>);
  }

  inputNumber(value) {
    return (
      <input
        className="number"
        type="number"
        data-testid="value-input"
        onChange={ this.handleChange }
        name="value"
        value={ value }
        pattern="^\d*(\.\d{0,2})?$"
      />
    );
  }

  inputText() {
    return (
      <input
        placeholder="Describe activity"
        type="text"
        data-testid="description-input"
        onChange={ this.handleChange }
        name="description"
      />
    );
  }

  selectMethod() {
    return (
      <select
        data-testid="method-input"
        name="method"
        onChange={ this.handleChange }
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }

  inputTag() {
    return (
      <select
        data-testid="tag-input"
        name="tag"
        onChange={ this.handleChange }
      >
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    );
  }

  // href RafaReis
  createButton(label, event) {
    return (
      <button
        className="btnForms"
        type="button"
        onClick={ event }
      >
        { label }
      </button>
    );
  }

  render() {
    const { currencies, eventEdit } = this.props;
    const { value } = this.state;
    return (
      <div className="backgroundForms">
        <forms className="expenseForms">
          {this.inputNumber(value)}
          {this.inputText()}
          {this.selectMethod()}
          { currencies && this.currencyInputDropDown(currencies) }
          {this.inputTag()}
          { eventEdit ? this.createButton('Editar despesa', this.handleExpenseChange)
            : this.createButton('Adicionar despesa', this.handleClick) }
        </forms>
        <ExpensesList />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    eventEdit: state.wallet.eventEdit,
    expense: state.wallet.expense,
  });

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
  getExpenses: (expense) => dispatch(addExpenses(expense)),
  expensesList: (expenses) => dispatch(setExpenses(expenses)),
  editExpense: (eventEdit, expense) => dispatch(editExpenses(eventEdit, expense)),
});

ExpenseForms.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  expensesList: PropTypes.func.isRequired,
  eventEdit: PropTypes.bool.isRequired,
  expense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    exchangeRates: PropTypes.string.isRequired,

  }).isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.func.isRequired,
    forEach: PropTypes.func.isRequired,
    map: PropTypes.func.isRequired,
  }).isRequired,
  currencies: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForms);
