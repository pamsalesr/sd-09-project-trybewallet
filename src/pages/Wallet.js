import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { currenciesObj, addExpenses } from '../actions';
import '../App.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
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
    const total = 0;
    return total;
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
    return (
      <label htmlFor="value">
        Valor da despesa
        <input
          data-testid="value-input"
          name="value"
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
          name="currency"
          onChange={ ({ target: { value } }) => {
            this.setState({ currency: value });
          } }
        >
          <option defaultValue>BRL</option>
          {Object.keys(currencies)
            .map((curr) => (curr !== 'USDT'
              ? <option data-testid={ curr } key={ curr }>{curr}</option>
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
          name="method"
          onChange={ ({ target: { value } }) => {
            this.setState({ method: value });
          } }
        >
          <option defaultValue hidden>Escolha</option>
          <option value="money">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
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
          name="tag"
          onChange={ ({ target: { value } }) => {
            this.setState({ tag: value });
          } }
        >
          <option defaultValue hidden>Escolha</option>
          <option value="food">Alimentação</option>
          <option value="recreation">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  submit() {
    const { propCurrenciesObj } = this.props;
    const { propAddExpenses, expenses, currencies } = this.props;
    propCurrenciesObj();
    propAddExpenses({ id: expenses.length, ...this.state, exchangeRates: currencies });
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
        <div>
          { this.expansesList() }
        </div>
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
