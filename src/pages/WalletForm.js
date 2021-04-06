import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrencyAction,
  setExpensesAction,
} from '../actions/index';

// Requisito resolvido com auxílio de revisão de colegas.

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.setOptionsCurrency = this.setOptionsCurrency.bind(this);
    this.setOptionsTag = this.setOptionsTag.bind(this);
    this.setOptionsPayment = this.setOptionsPayment.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  setOptionsCurrency() {
    const { currencies } = this.props;
    if (!currencies) {
      return [];
    }
    const currencyArray = Object.keys(currencies).map(
      (currentValue) => currencies[currentValue],
    );
    return (
      <select onChange={ this.handleChange } name="currency">
        {currencyArray.map((currentValue) => (
          <option
            value={ currentValue.code }
            key={ currentValue.name }
            data-testid={ currentValue.code }
          >
            {currentValue.code}
          </option>
        ))}
      </select>
    );
  }

  setOptionsTag() {
    return (
      <select
        data-testid="tag-input"
        onChange={ this.handleChange }
        name="tag"
        id="tag-input"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  setOptionsPayment() {
    return (
      <select
        data-testid="method-input"
        id="method-input"
        name="method"
        onChange={ this.handleChange }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    await this.fetchCurrency();
    const { value, description, currency, tag, method } = this.state;
    const { setExpensesDispatcher, currencies, expenses } = this.props;
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates: currencies,
    };
    setExpensesDispatcher(expense);
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  async fetchCurrency() {
    const { getCurrencyDispatcher } = this.props;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const response = await fetch(endpoint);
      const responseJson = await response.json();
      delete responseJson.USDT;
      await getCurrencyDispatcher(responseJson);
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            name="value"
            value={ value }
            type="text"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
            name="description"
            value={ description }
          />
        </label>
        <label htmlFor="currency-input" data-testid="currency-input">
          Moeda:
          {this.setOptionsCurrency()}
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          { this.setOptionsPayment() }
        </label>
        <label htmlFor="tag-input">
          Tag:
          {this.setOptionsTag()}
        </label>
        <button type="button" onClick={ this.handleClick }>
          Adicionar despesa:
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  getCurrencyDispatcher: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getCurrencyDispatcher: (responseJson) => dispatch(getCurrencyAction(responseJson)),
  setExpensesDispatcher: (expenses) => dispatch(setExpensesAction(expenses)),
});

const mapStatetoProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStatetoProps, mapDispatchToProps)(WalletForm);
