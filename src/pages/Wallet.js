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
    this.spendingForm = this.spendingForm.bind(this);
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

  spendingForm() {
    const { currencies } = this.props;
    return (
      <form>
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
      </form>
    );
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        <div>
          { this.makeHeader() }
        </div>
        <div>
          { currencies && this.spendingForm() }
        </div>
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
