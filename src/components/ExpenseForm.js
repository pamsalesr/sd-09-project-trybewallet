import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpenseToStore } from '../actions';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesFromAPI } = this.props;
    fetchCurrenciesFromAPI();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async fetchExchangeRates() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const myRates = await fetch(url).then((response) => response.json());

    return myRates;
  }

  async handleClick() {
    const { value, description, method, tag, currency, id } = this.state;
    const { addExpense } = this.props;

    this.fetchExchangeRates().then((response) => {
      const expenses = {
        id,
        value,
        description,
        method,
        tag,
        currency,
        exchangeRates: response,
      };
      addExpense(expenses);
      this.setState((state) => ({
        ...INITIAL_STATE,
        id: state.id + 1,
      }));
    });
  }

  renderValueInputField() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="text"
          name="value"
          data-testid="value-input"
          id="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInputField() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          name="description"
          data-testid="description-input"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
          id="currency"
        >
          { currencies.map((myCurrency) => (
            <option
              key={ myCurrency }
              data-testid={ myCurrency }
              value={ myCurrency }
            >
              {myCurrency}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de Pagamento:
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
          id="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagField() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
          id="tag"
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

  render() {
    return (

      <form>
        { this.renderValueInputField() }
        { this.renderDescriptionInputField() }
        { this.renderCurrencyInput() }
        { this.renderPaymentMethod() }
        { this.renderTagField() }
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesFromAPI: () => dispatch(fetchCurrencies()),
  addExpense: (expense) => dispatch(addExpenseToStore(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  fullCurrencies: state.wallet.fullCurrencies,
});

ExpenseForm.propTypes = {
  fetchCurrenciesFromAPI: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
