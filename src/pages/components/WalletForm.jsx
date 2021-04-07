import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencies, addExpense, updateTotal, editExpense } from '../../actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.getExchangeRates = this.getExchangeRates.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.setCurrencies = this.setCurrencies.bind(this);
    this.reduceTotal = this.reduceTotal.bind(this);
    this.resetStates = this.resetStates.bind(this);
    this.renderFormInputs = this.renderFormInputs.bind(this);
    this.renderFormSelects = this.renderFormSelects.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.openEditMode = this.openEditMode.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
  }

  componentDidMount() {
    this.setCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { editMode } = this.props;
    if (prevProps.editMode !== editMode) {
      this.openEditMode();
    }
  }

  async getExchangeRates() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const object = await response.json();
    delete object.USDT;
    return object;
  }

  async setCurrencies() {
    const { getCurrencySymbols } = this.props;
    const object = await this.getExchangeRates();
    getCurrencySymbols(Object.keys(object));
  }

  openEditMode() {
    const { editMode, editedExpense } = this.props;
    this.setState({ editMode });
    this.setState(editedExpense);
  }

  reduceTotal() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((prev, { value, currency, exchangeRates }) => (
        prev + value * exchangeRates[currency].ask
      ), 0);
    return total;
  }

  async saveExpense() {
    const { getExpense, updateNewTotal, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const recentRates = await this.getExchangeRates();
    const myExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: recentRates,
    };
    getExpense(myExpense);
    const newTotal = await this.reduceTotal();
    updateNewTotal(newTotal);
    this.resetStates();
  }

  async updateExpense() {
    const { updateExpense, updateNewTotal } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const myExpense = { id, value, description, currency, method, tag, exchangeRates };
    updateExpense(myExpense);
    const newTotal = await this.reduceTotal();
    updateNewTotal(newTotal);
    this.resetStates();
  }

  resetStates() {
    const INITIAL_STATE = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      editMode: false,
    };
    this.setState(INITIAL_STATE);
  }

  renderFormInputs() {
    const { value, description } = this.state;
    return (
      <>
        <input
          data-testid="value-input"
          value={ value }
          type="text"
          name="value"
          placeholder="value"
          onChange={ (e) => this.setState({ value: e.target.value }) }
        />
        <input
          data-testid="description-input"
          value={ description }
          type="text"
          name="description"
          placeholder="description"
          onChange={ (e) => this.setState({ description: e.target.value }) }
        />
      </>
    );
  }

  renderFormSelects() {
    const { method, tag } = this.state;
    return (
      <>
        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ (e) => this.setState({ method: e.target.value }) }
        >
          <option value="">Forma de Pag.</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          placeholder="tag"
          onChange={ (e) => this.setState({ tag: e.target.value }) }
        >
          <option value="">Categoria</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </>
    );
  }

  renderEditButton() {
    return (
      <button
        type="button"
        onClick={ this.updateExpense }
      >
        Editar despesa
      </button>
    );
  }

  renderAddButton() {
    return (
      <button
        type="button"
        onClick={ this.saveExpense }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { currency, editMode } = this.state;
    const { currencyList } = this.props;
    return (
      <form>
        {this.renderFormInputs()}
        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          placeholder="currency"
          onChange={ (e) => this.setState({ currency: e.target.value }) }
        >
          <option value="">Currency</option>
          {currencyList
            .map((item) => (
              <option
                key={ item }
                data-testid={ item }
                value={ item }
              >
                {item}
              </option>))}
        </select>
        {this.renderFormSelects()}
        { editMode ? this.renderEditButton() : this.renderAddButton() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  expenses: state.wallet.expenses,
  totalOfExpenses: state.wallet.expensesTotal,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencySymbols: (currencies) => dispatch(getCurrencies(currencies)),
  getExpense: (expense) => dispatch(addExpense(expense)),
  updateNewTotal: (total) => dispatch(updateTotal(total)),
  updateExpense: (expense) => dispatch(editExpense(expense)),
});

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  currencyList: PropTypes.arrayOf(String).isRequired,
  getCurrencySymbols: PropTypes.func.isRequired,
  getExpense: PropTypes.func.isRequired,
  updateNewTotal: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  editedExpense: PropTypes.shape().isRequired,
  updateExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
