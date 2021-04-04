import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrencies, addExpenses } from '../actions';
import fetchCurrency from '../services/currencyApi';
// import ExpensesTable from './ExpensesTable';
import ExpensesList from './ExpensesList';

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
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.inputText = this.inputText.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.inputTag = this.inputTag.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    const { getCurrencies } = this.props;
    fetchCurrency()
      .then((currencies) => getCurrencies(currencies));
  }

  async handleClick() {
    this.fetchCurrencies();
    const { getExpenses, currencies, expenses } = this.props;
    const expense = { id: expenses.length, ...this.state, exchangeRates: currencies };
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

  currencyInputDropDown(currencies) {
    return (
      <select
        data-testid="currency-input"
        onChange={ this.handleChange }
        name="currency"
      >
        { Object.keys(currencies).map((currency) => (
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

  render() {
    const { currencies } = this.props;
    const { value } = this.state;
    return (
      <div>
        <forms>
          {this.inputNumber(value)}
          {this.inputText()}
          {this.selectMethod()}
          { currencies && this.currencyInputDropDown(currencies) }
          {this.inputTag()}
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </forms>
        {/* <ExpensesTable /> */}
        <ExpensesList />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
  });

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
  getExpenses: (expenses) => dispatch(addExpenses(expenses)),
});

ExpenseForms.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.func.isRequired,
    forEach: PropTypes.func.isRequired,
  }).isRequired,
  currencies: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForms);
