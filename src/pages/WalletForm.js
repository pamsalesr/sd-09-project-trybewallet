import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrencyAction,
  setExpensesAction,
  setTotalExpensesAction,
} from '../actions/index';

// Requisito resolvido com auxílio de revisão de colegas.

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.setOptionsCurrency = this.setOptionsCurrency.bind(this);
    this.setOptionsTag = this.setOptionsTag.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  setOptionsCurrency() {
    const { currency } = this.props;
    if (!currency) {
      return [];
    }
    const currencyArray = Object.keys(currency).map(
      (currentValue) => currency[currentValue],
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
        id="tag-input"
        name="tag"
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
    const { setExpensesDispatcher } = this.props;
    setExpensesDispatcher(this.state);
    this.sumExpenses();
  }

  async fetchCurrency() {
    const { getCurrencyDispatcher } = this.props;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const response = await fetch(endpoint);
      const responseJson = await response.json();
      delete responseJson.USDT;
      return getCurrencyDispatcher(responseJson);
    } catch (error) {
      console.log(error);
    }
  }

  async sumExpenses() {
    const { setTotalExpensesDispatcher } = this.props;
    const currencies = await this.fetchCurrency();
    const currencyArray = Object.keys(currencies).map(
      (currentValue) => currencies[currentValue],
    );
    const { expenses } = this.props;
    let total = 0;
    let convertion = 0;
    expenses.forEach((currentValue) => {
      const currentCurrency = currencyArray.find(
        (element) => element.code === currentValue.currency,
      );
      total += currentValue.value * currentCurrency.ask;
      convertion = total.toFixed(2);
    });
    setTotalExpensesDispatcher(convertion);
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
          Método de Pagamento:
          {this.setOptionsPayment()}
        </label>
        <label htmlFor="tag-input">
          Tag:
          {this.setOptionsTag()}
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
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
  setTotalExpensesDispatcher: (expenses) => dispatch(setTotalExpensesAction(expenses)),
});

const mapStatetoProps = (state) => ({
  currency: state.wallet.currency,
  expenses: state.wallet.expenses,
});

export default connect(mapStatetoProps, mapDispatchToProps)(WalletForm);
