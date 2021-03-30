import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkExpensesAction, thunkWalletAction } from '../actions/coinAPIAction';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.methodPayFunc = this.methodPayFunc.bind(this);
    this.coinFunc = this.coinFunc.bind(this);
    this.tagFunc = this.tagFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.expenseClick = this.expenseClick.bind(this);
    this.calcExpense = this.calcExpense.bind(this);
    this.descriptionFunc = this.descriptionFunc.bind(this);

    this.state = {
      id: 0,
      value: '0',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentacao',
      description: '',
    };
  }

  componentDidMount() {
    const { addCoin } = this.props;
    addCoin();
  }

  valueFunc() {
    const { value } = this.state;

    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          id="value"
          name="value"
          value={ value }
          onChange={ this.handleChange }
          data-testid="value-input"
        />
      </label>
    );
  }

  methodPayFunc() {
    const { method } = this.state;
    const methodPay = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    return (
      <label htmlFor="method">
        Metodo de pagamento:
        <select
          id="method"
          name="method"
          value={ method }
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          {methodPay.map((methodP) => (
            <option value={ methodP } key={ methodP }>{methodP}</option>))}
        </select>
      </label>
    );
  }

  tagFunc() {
    const { tag } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <label htmlFor="tag">
        TAG:
        <select
          id="tag"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
          data-testid="tag-input"
        >
          {tags.map((tagMap) => (
            <option value={ tagMap } key={ tagMap }>{tagMap}</option>))}
        </select>
      </label>
    );
  }

  coinFunc() {
    const { currencies } = this.props;
    const { currency } = this.state;

    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
          data-testid="currency-input"
        >
          {currencies.map((currencyMap) => (
            <option
              value={ currencyMap.code }
              key={ currencyMap.code }
              data-testid={ currencyMap.code }
            >
              {currencyMap.code}
            </option>
          ))}
        </select>
      </label>
    );
  }

  descriptionFunc() {
    const { description } = this.state;

    return (
      <label htmlFor="description">
        Descricao:
        <input
          type="text"
          id="description"
          name="description"
          value={ description }
          onChange={ this.handleChange }
          data-testid="description-input"
        />
      </label>
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  expenseClick() {
    const { id, value, method, currency, tag, description } = this.state;
    const { addExpense } = this.props;

    addExpense({ id, value, currency, method, tag, description });

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentacao',
      description: '',
    }));
  }

  calcExpense() {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return 0;
    }
    const result = expenses.reduce((acc, curr) => {
      const toInt = 10000;
      const cal01 = curr.exchangeRates[curr.currency].ask * toInt;
      const cal02 = curr.value;
      const mult = Math.round(cal01 * cal02) / toInt;
      return acc + mult;
    }, 0);
    return result;
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{`Despesa Total: R$${this.calcExpense()} `}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <div>
          <form>
            {this.valueFunc()}
            {this.methodPayFunc()}
            {this.coinFunc()}
            {this.tagFunc()}
            {this.descriptionFunc()}
            <button
              type="button"
              onClick={ this.expenseClick }
            >
              Adicionar despesa
            </button>
          </form>
        </div>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addCoin: () => dispatch(thunkWalletAction()),
  addExpense: (expenses) => dispatch(thunkExpensesAction(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencies: PropTypes.arrayOf(PropTypes.object),
  addCoin: PropTypes.func,
  addExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
