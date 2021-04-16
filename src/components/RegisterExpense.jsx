/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrency from '../services/api';
import { setExpense as setExpenseThunk } from '../actions';

class RegisterExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    fetchCurrency().then((currencies) => this.setState({ currencies }));
  }

  setExpense(event) {
    event.preventDefault();
    const { setExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = { value, description, currency, method, tag };
    setExpense(expense);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies } = this.state;
    const selectCurrency = Object.keys(currencies).map((currency, index) => (
      <option
        value={ currency }
        key={ index }
        data-testid={ currency }
      >
        {currency}
      </option>
    ));
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleInputChange }
          >
            {selectCurrency}
          </select>
        </label>
        <label htmlFor="method">
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.handleInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ (event) => this.setExpense(event) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(setExpenseThunk(expense)),
});

RegisterExpense.propTypes = {
  setExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterExpense);
