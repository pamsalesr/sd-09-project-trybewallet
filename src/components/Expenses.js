import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SectionInputs, Button } from './WalletStyled';
import { addExpensesActions } from '../actions/index';

class WalletExpenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyAbbreviation: [],
      exchangeRates: '',
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.valueFields = this.valueFields.bind(this);
    this.methodFields = this.methodFields.bind(this);
    this.requestCurrencyApi = this.requestCurrencyApi.bind(this);
    this.currencyAbbreviation = this.currencyAbbreviation.bind(this);
    this.saveGlobal = this.saveGlobal.bind(this);
  }

  componentDidMount() {
    this.currencyAbbreviation();
  }

  async requestCurrencyApi() {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const returnAPI = await request.json();
    this.setState({
      exchangeRates: returnAPI,
    });
  }

  async currencyAbbreviation() {
    await this.requestCurrencyApi();
    const { exchangeRates } = this.state;
    this.setState({
      currencyAbbreviation: Object.keys(exchangeRates).filter((item) => item !== 'USDT'),
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  valueFields() {
    const { currencyAbbreviation } = this.state;
    return (
      <>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            id="value"
            type="number"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>

        <label htmlFor="expense">
          Despesa:
          <input
            data-testid="description-input"
            name="description"
            id="expense"
            type="text"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            onChange={ (event) => this.handleChange(event) }
          >
            {currencyAbbreviation.map((moeda, index) => (
              <option data-testid={ moeda } key={ index }>{ moeda }</option>
            ))}
          </select>
        </label>
      </>
    );
  }

  methodFields() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <>
        <label htmlFor="method">
          Método de Pgto:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            onChange={ (event) => this.handleChange(event) }
          >
            {methods.map((method, index) => (
              <option key={ index }>{ method }</option>
            ))}
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            onChange={ (event) => this.handleChange(event) }
          >
            {tags.map((tag, index) => (
              <option key={ index }>{ tag }</option>
            ))}
          </select>
        </label>

        <Button
          type="button"
          onClick={ () => this.saveGlobal() }
        >
          Adicionar despesa
        </Button>
      </>
    );
  }

  saveGlobal() {
    const { dispatchExpenseInfo } = this.props;
    const { exchangeRates, id, value, description, currency, method, tag } = this.state;

    this.requestCurrencyApi();
    const stateObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    dispatchExpenseInfo(stateObj);

    this.setState({
      id: id + 1,
    });
  }

  render() {
    return (
      <SectionInputs>
        { this.valueFields() }
        { this.methodFields() }
      </SectionInputs>
    );
  }
}

WalletExpenses.propTypes = {
  dispatchExpenseInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenseInfo: (stateObj) => dispatch(addExpensesActions(stateObj)),
});

export default connect(null, mapDispatchToProps)(WalletExpenses);
