import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createExpense, currencyFetching } from '../actions/index';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.createHeader = this.createHeader.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createCurrency = this.createCurrency.bind(this);
    this.createMethod = this.createMethod.bind(this);
    this.createDescription = this.createDescription.bind(this);
    this.createTags = this.createTags.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  async getCurrency() {
    try {
      const repsonse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currency = await repsonse.json();
      delete currency.USDT;
      return currency;
    } catch (error) {
      console.error(error);
    }
  }

  createHeader() {
    //  expenses.value * expenses.exchangeRates.CAD.ask
    const { email, expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.value * expense.exchangeRates[expense.currency].ask;
    });

    return (
      <header>
        <h1>
          TrybeWallet
        </h1>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{total.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }

  createCurrency() {
    const { currencies } = this.props;
    return (

      <select
        name="currency"
        data-testid="currency-input"
        id="currency"
        onChange={ this.handleChange }
      >
        {currencies.map((currency) => (
          <option
            key={ currency }
            value={ currency }
            data-testid={ currency }
          >
            {currency}
          </option>))}
      </select>
    );
  }

  createMethod() {
    return (
      <label htmlFor="method">
        <select
          name="method"
          data-testid="method-input"
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

  createDescription() {
    const { description } = this.state;
    return (
      <input
        name="description"
        value={ description }
        data-testid="description-input"
        id="description"
        onChange={ this.handleChange }
      />
    );
  }

  createTags() {
    return (
      <select
        name="tag"
        data-testid="tag-input"
        onChange={ this.handleChange }
        id="tag"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { dispatchExpense, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const exchange = await this.getCurrency();
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchange,
    };
    dispatchExpense(expense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        {this.createHeader()}
        <label htmlFor="currency">
          Moeda:
          {this.createCurrency()}
        </label>
        <label htmlFor="spending">
          Valor:
          <input
            name="value"
            value={ value }
            data-testid="value-input"
            id="value"
            onChange={ this.handleChange }
          />
        </label>

        {this.createMethod()}

        <label htmlFor="description">
          Descrição:
          {this.createDescription()}
        </label>

        <label htmlFor="tag">
          Tag:
          {this.createTags()}
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
        <Table />
      </div>);
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(currencyFetching()),
  dispatchExpense: (expense) => dispatch(createExpense(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  dispatchExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf('').isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
