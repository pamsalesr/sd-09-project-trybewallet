import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, object } from 'prop-types';
import { addExpense, addTotalExpenses, fetchCurrencies } from '../actions';
import getCurrencyCotation from '../services/awesomeApi';

const INITIAL_STATE = {
  id: 0,
  value: String(),
  description: '',
  currency: '',
  method: '',
  tag: '',
};

class Expenses extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.updateState = this.updateState.bind(this);
    this.handleExpense = this.handleExpense.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  getTotal() {
    const { expenses, updateTotalExpense } = this.props;
    const total = expenses.reduce((acc, { value, currency, exchangeRates }) => (
      acc + Number(value * exchangeRates[currency].ask)
    ), 0);
    updateTotalExpense(total);
  }

  updateState({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleExpense() {
    const getExchangeRates = await getCurrencyCotation();
    const { addNewExpense } = this.props;
    addNewExpense(this.state, getExchangeRates);
    this.setState((state) => ({
      ...INITIAL_STATE,
      id: state.id + 1,
    }));
    this.getTotal();
  }

  valueInput() {
    const { value } = this.state;
    return (
      <div>
        <label htmlFor="value">
          <input
            onChange={ this.updateState }
            name="value"
            value={ value }
            data-testid="value-input"
            type="number"
            placeholder="Valor"
          />
        </label>
      </div>
    );
  }

  description() {
    const { description } = this.state;
    return (
      <div>
        <label htmlFor="description">
          <textarea
            onChange={ this.updateState }
            name="description"
            value={ description }
            data-testid="description-input"
            placeholder="Descricao"
            cols="21"
            rows="1"
          />
        </label>
      </div>
    );
  }

  currencyOptions() {
    const { currency } = this.state;
    const { filteredCurrencies } = this.props;
    return (
      <div>
        <select
          onChange={ this.updateState }
          name="currency"
          value={ currency }
          data-testid="currency-input"
        >
          <option>Selecione uma moeda</option>
          { filteredCurrencies.map((curr) => (
            <option key={ `${curr} ${curr.length}` } data-testid={ curr }>{ curr }</option>)) }
        </select>
      </div>
    );
  }

  method() {
    const { method } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <div>
        <select
          onChange={ this.updateState }
          name="method"
          value={ method }
          data-testid="method-input"
        >
          <option>Selecione um metodo de pagamento</option>
          { methods.map((payment) => (
            <option key={ payment }>{ payment }</option>
          )) }
        </select>
      </div>
    );
  }

  tag() {
    const { tag } = this.state;
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <select
          onChange={ this.updateState }
          name="tag"
          value={ tag }
          data-testid="tag-input"
        >
          <option>Selecione uma categoria</option>
          { categories.map((category) => (
            <option key={ category }>{ category }</option>
          )) }
        </select>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.valueInput() }
        { this.description() }
        { this.currencyOptions() }
        { this.method() }
        { this.tag() }
        <button
          onClick={ () => this.handleExpense() }
          type="button"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredCurrencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addNewExpense: (expense, getExchangeRates) => dispatch(
    addExpense(expense, getExchangeRates),
  ),
  updateTotalExpense: (total) => dispatch(addTotalExpenses(total)),
});

Expenses.propTypes = {
  filteredCurrencies: arrayOf(object),
  expenses: arrayOf(object),
  getCurrencies: func,
  addNewExpense: func,
  updateTotalExpense: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
