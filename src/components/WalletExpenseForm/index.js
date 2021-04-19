import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../../services/api';
import { addExpense, sumExpenses } from '../../actions';
import './styles.css';

class WalletExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.valueInput = this.valueInput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.currencyInput = this.currencyInput.bind(this);
    this.methodInput = this.methodInput.bind(this);
    this.tagInput = this.tagInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const apiCurrencies = await getCurrencies();
    this.setState({
      currencies: Object.keys(apiCurrencies),
    });
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  async submitExpense(event) {
    event.preventDefault();
    const { dispatchExpense, totalExpensesValue } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const exchangeRates = await getCurrencies();
    const expenseKeys = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const currencyIndex = Object.keys(exchangeRates).indexOf(currency);
    const currencyQuote = Object.values(exchangeRates)[currencyIndex].ask;
    const valueForQuote = parseFloat(value) * parseFloat(currencyQuote);
    console.log(valueForQuote);
    dispatchExpense(
      expenseKeys,
    );
    totalExpensesValue(valueForQuote);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
    const expenseForm = document.getElementById('expense-form');
    expenseForm.reset();
  }

  valueInput() {
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="text"
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  descriptionInput() {
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyInput() {
    const { currencies } = this.state;
    return (
      <select
        data-testid="currency-input"
        id="currency-input"
        name="currency"
        onChange={ this.handleChange }
        defaultValue="Moeda"
      >
        <option disabled>Moeda</option>
        {
          currencies.map((currency) => ((currency !== 'USDT') ? (
            <option
              key={ currency }
              value={ currency }
              data-testid={ currency }
            >
              { currency }
            </option>
          ) : ''))
        }
      </select>
    );
  }

  methodInput() {
    return (
      <select
        data-testid="method-input"
        id="method-input"
        name="method"
        onChange={ this.handleChange }
        defaultValue="Forma de pagamento"
      >
        <option disabled>Forma de pagamento</option>
        <option key="dinheiro">Dinheiro</option>
        <option key="credito">Cartão de crédito</option>
        <option key="debito">Cartão de débito</option>
      </select>
    );
  }

  tagInput() {
    return (
      <select
        data-testid="tag-input"
        id="tag-input"
        name="tag"
        onChange={ this.handleChange }
        defaultValue="Categoria"
      >
        <option disabled>Categoria</option>
        <option key="alimentacao">Alimentação</option>
        <option key="lazer">Lazer</option>
        <option key="trabalho">Trabalho</option>
        <option key="transporte">Transporte</option>
        <option key="saude">Saúde</option>
      </select>
    );
  }

  submitInput() {
    return (
      <input
        type="submit"
        value="Adicionar despesa"
        onClick={ this.submitExpense }
      />
    );
  }

  /* async submitExpense() {
    const getCurrenciesCotation = await this.fetchCurrencies
  } */

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form id="expense-form">
        { this.valueInput(value) }
        { this.descriptionInput(description) }
        { this.currencyInput(currency) }
        { this.methodInput(method) }
        { this.tagInput(tag) }
        { this.submitInput() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expenses) => dispatch(addExpense(expenses)),
  totalExpensesValue: (value) => dispatch(sumExpenses(value)),
});

WalletExpenseForm.propTypes = {
  // expense: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExpense: PropTypes.func,
  value: PropTypes.string,
  totalExpensesValue: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseForm);

// export default WalletExpenseForm;
