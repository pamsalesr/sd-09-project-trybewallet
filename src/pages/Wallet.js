import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { currenciesObj } from '../actions';
import '../App.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      spending: 0,
      currency: 'BRL',
      newValue: 0,
      description: '',
    };
    this.makeHeader = this.makeHeader.bind(this);
    this.spendingValue = this.spendingValue.bind(this);
    this.spendingDescription = this.spendingDescription.bind(this);
    this.spendingCurrency = this.spendingCurrency.bind(this);
    this.spendingMethod = this.spendingMethod.bind(this);
    this.spendingCategory = this.spendingCategory.bind(this);
  }

  componentDidMount() {
    const { propCurrenciesObj } = this.props;
    propCurrenciesObj();
  }

  makeHeader() {
    const { email } = this.props;
    const { spending, currency } = this.state;
    return (
      <header className="App-header">
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          {`gastos: ${spending}`}
        </span>
        <span data-testid="header-currency-field">
          {`moeda: ${currency}`}
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
            this.setState({ newValue: value });
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
        >
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
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  spendingCategory() {
    return (
      <label htmlFor="tag">
        Forma de pagamento
        <select
          data-testid="tag-input"
          name="tag"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </label>
    );
  }

  submit() {
    const { newValue, description } = this.state;
    console.log(newValue, description);
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        <div>
          { this.makeHeader() }
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

const mapStateToProps = ({ user: { email }, wallet: { currencies } }) => ({
  email,
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  propCurrenciesObj: () => dispatch(currenciesObj()) });

Wallet.propTypes = {
  email: Proptypes.string,
  propCurrenciesObj: Proptypes.func,
  currencies: Proptypes.arrayOf(Proptypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
