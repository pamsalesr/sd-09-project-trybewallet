import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpensesActions, fetchEconomicDataAction } from '../actions';

class WalletInputs extends Component {
  constructor() {
    super();

    this.state = {
      currencyAbbreviation: [],
      exchangeRates: '',
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      total: 0,
    };

    this.valueField = this.valueField.bind(this);
    this.descriptionField = this.descriptionField.bind(this);
    this.currencyField = this.currencyField.bind(this);
    this.methodField = this.methodField.bind(this);
    this.tagField = this.tagField.bind(this);
    this.btnAddExpense = this.btnAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.requestCurrencyApi = this.requestCurrencyApi.bind(this);
    this.currencyAbbreviation = this.currencyAbbreviation.bind(this);
    this.saveGlobal = this.saveGlobal.bind(this);
  }

  componentDidMount() {
    const { getDataAPI } = this.props;
    getDataAPI();
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

  totalExpenses() {
    const { expenses } = this.props;
    const totalSum = expenses.reduce((acc, curr) => (
      (Number(curr.exchangeRates[curr.currency].ask * Number(curr.value)) + acc)
    ), 0);
    this.setState({
      total: totalSum,
    });
    console.log('L71', this.state.total);
  }

  async saveGlobal() {
    const { dispatchExpenseInfo } = this.props;

    const {
      exchangeRates,
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    await this.requestCurrencyApi();

    const stateObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    await dispatchExpenseInfo(stateObj);
    await this.totalExpenses();

    this.setState({
      id: id + 1,
    });
  }

  valueField() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          data-testid="value-input"
          id="value"
          type="number"
          value={ value }
          onChange={ (event) => this.handleChange(event) }
        />
      </label>
    );
  }

  descriptionField() {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          data-testid="description-input"
          id="description"
          type="tetxt"
          onChange={ (event) => this.handleChange(event) }
        />
      </label>
    );
  }

  currencyField() {
    const { currencyAbbreviation } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          data-testid="currency-input"
          onChange={ (event) => this.handleChange(event) }
          name="currency"
          id="currency"
        >
          {currencyAbbreviation.map((moeda, index) => (
            <option
              data-testid={ moeda }
              key={ index }
              value={ moeda }
            >
              { moeda }
            </option>
          ))}
        </select>
      </label>
    );
  }

  methodField() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method">
        Método de Pgto:
        <select
          data-testid="method-input"
          name="method"
          id="method"
          onChange={ (event) => this.handleChange(event) }
        >
          {methods.map((method, index) => (
            <option key={ index } value={ method }>{ method }</option>
          ))}
        </select>
      </label>
    );
  }

  tagField() {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
          onChange={ (event) => this.handleChange(event) }
        >
          {tags.map((tag, index) => (
            <option key={ index } value={ tag }>{ tag }</option>
          ))}
        </select>
      </label>
    );
  }

  btnAddExpense() {
    return (
      <button
        type="button"
        onClick={ () => this.saveGlobal }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    return (
      <>
        { this.valueField() }
        { this.descriptionField() }
        { this.currencyField() }
        { this.methodField() }
        { this.tagField() }
        { this.btnAddExpense() }
      </>
    );
  }
}

WalletInputs.propTypes = {
  getDataAPI: PropTypes.func.isRequired,
  dispatchExpenseInfo: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  total: state.wallet.total,
  data: state.economicData.data,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenseInfo: (stateObj) => dispatch(addExpensesActions(stateObj)),
  getDataAPI: () => dispatch(fetchEconomicDataAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletInputs);
