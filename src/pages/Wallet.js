import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { currenciesObj, addExpenses } from '../actions';
import '../App.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'USD',
      value: 0,
      description: '',
      method: '',
      tag: '',
    };
    this.walletHeader = this.walletHeader.bind(this);
    this.spendingValue = this.spendingValue.bind(this);
    this.spendingDescription = this.spendingDescription.bind(this);
    this.spendingCurrency = this.spendingCurrency.bind(this);
    this.spendingMethod = this.spendingMethod.bind(this);
    this.spendingCategory = this.spendingCategory.bind(this);
    this.totalSpending = this.totalSpending.bind(this);
    this.submit = this.submit.bind(this);
    this.expansesList = this.expansesList.bind(this);
  }

  componentDidMount() {
    const { propCurrenciesObj } = this.props;
    propCurrenciesObj();
  }

  totalSpending() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => (
      acc + (parseFloat(curr.value)
        * parseFloat(curr.exchangeRates[curr.currency].ask))), 0);
    return total.toFixed(2);
  }

  walletHeader() {
    const { email } = this.props;
    return (
      <header className="App-header">
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          {`gastos: $ ${this.totalSpending()}`}
        </span>
        <span data-testid="header-currency-field">
          moeda: BRL
        </span>
      </header>
    );
  }

  spendingValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor da despesa
        <input
          data-testid="value-input"
          name="value"
          value={ value }
          type="number"
          step="0.01"
          min="0"
          onChange={ ({ target: { value } }) => {
            this.setState({ value });
          } }
        />
      </label>
    );
  }

  spendingDescription() {
    return (
      <label htmlFor="description">
        Descrição
        <input
          data-testid="description-input"
          name="description"
          type="text"
          onChange={ ({ target: { value } }) => {
            this.setState({ description: value });
          } }
        />
      </label>
    );
  }

  spendingCurrency() {
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          data-testid="currency-input"
          id="currency"
          onChange={ ({ target: { value } }) => {
            this.setState({ currency: value });
          } }
        >
          {Object.keys(currencies)
            .map((curr) => (curr !== 'USDT'
              ? <option data-testid={ curr } key={ curr } value={ curr }>{curr}</option>
              : null))}
        </select>
      </label>
    );
  }

  spendingMethod() {
    return (
      <label htmlFor="method">
        Forma de pagamento
        <select
          data-testid="method-input"
          id="method"
          onChange={ ({ target: { value } }) => {
            this.setState({ method: value });
          } }
        >
          <option defaultValue hidden>Escolha</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  spendingCategory() {
    return (
      <label htmlFor="tag">
        Categoria da despesa
        <select
          data-testid="tag-input"
          id="tag"
          onChange={ ({ target: { value } }) => {
            this.setState({ tag: value });
          } }
        >
          <option defaultValue hidden>Escolha</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  submit() {
    const { propCurrenciesObj } = this.props;
    const { propAddExpenses, expenses, currencies } = this.props;
    propCurrenciesObj();
    propAddExpenses({ id: expenses.length, ...this.state, exchangeRates: currencies });
    this.setState({ value: 0 });
  }

  expansesList() {
    const { expenses } = this.props;
    return (
      <ul>
        { expenses.map((exp) => <li key={ exp.id }>{ exp }</li>) }
      </ul>
    );
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        <div>
          { this.walletHeader() }
        </div>
        <form>
          { this.spendingValue() }
          { this.spendingDescription() }
          { currencies && this.spendingCurrency() }
          { this.spendingMethod() }
          { this.spendingCategory() }
          <button type="button" onClick={ this.submit }>Adicionar despesa</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { currencies, expenses } }) => ({
  email,
  currencies,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  propCurrenciesObj: () => dispatch(currenciesObj()),
  propAddExpenses: (data) => dispatch(addExpenses(data)),
});

Wallet.propTypes = {
  email: Proptypes.string,
  propCurrenciesObj: Proptypes.func,
  currencies: Proptypes.arrayOf(Proptypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
