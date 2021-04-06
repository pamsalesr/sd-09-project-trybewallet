import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  PAYMENT_METHODS,
  EXPENSES_TAGS,
} from '../services';
import { addExpenseAction } from '../actions';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: PAYMENT_METHODS[0],
  tag: EXPENSES_TAGS[0],
};

class NewExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      newExpense: { ...INITIAL_STATE },
    };

    this.updateCurrencies = this.updateCurrencies.bind(this);
    this.renderCurrenciesSelection = this.renderCurrenciesSelection.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.saveNewExpense = this.saveNewExpense.bind(this);
  }

  componentDidMount() {
    this.updateCurrencies();
  }

  onChangeField({ target: { name, value } }) {
    this.setState(
      ({ newExpense }) => ({ newExpense: { ...newExpense, [name]: value } }),
    );
  }

  async updateCurrencies() {
    const currencies = await fetchCurrencies();
    this.setState(({ newExpense }) => (
      {
        currencies,
        newExpense: {
          ...newExpense,
          currency: Object.keys(currencies)[0],
        },
      }
    ));
  }

  async saveNewExpense() {
    const { saveExpense } = this.props;
    const { newExpense } = this.state;
    saveExpense({ ...newExpense, exchangeRates: await fetchCurrencies() });
    this.setState({ newExpense: INITIAL_STATE });
  }

  renderCurrenciesSelection(value) {
    const { currencies } = this.state;
    const optionsEntries = Object.keys(currencies);
    return (
      <select
        data-testid="currency-input"
        name="currency"
        onChange={ this.onChangeField }
        value={ value }
      >
        { this.renderOptionsFor(optionsEntries, true) }
      </select>
    );
  }

  renderMethodsSelection(value) {
    return (
      <select
        data-testid="method-input"
        name="method"
        onChange={ this.onChangeField }
        value={ value }
      >
        { this.renderOptionsFor(PAYMENT_METHODS) }
      </select>
    );
  }

  renderTagsSelection(value) {
    return (
      <select
        data-testid="tag-input"
        name="tag"
        onChange={ this.onChangeField }
        value={ value }
      >
        { this.renderOptionsFor(EXPENSES_TAGS) }
      </select>
    );
  }

  renderOptionsFor(entries, hasTestId = false) {
    return (
      entries.map((entry) => (
        <option
          key={ entry }
          value={ entry }
          { ...hasTestId && { 'data-testid': entry } }
        >
          { entry }
        </option>))
    );
  }

  render() {
    const { newExpense: {
      value,
      description,
      currency,
      method,
      tag,
    } } = this.state;

    return (
      <section>
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ this.onChangeField }
          value={ value }
        />
        <input
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.onChangeField }
          value={ description }
        />
        { this.renderCurrenciesSelection(currency) }
        { this.renderMethodsSelection(method) }
        { this.renderTagsSelection(tag) }
        <button
          type="button"
          onClick={ this.saveNewExpense }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpenseAction(expense)),
});

export default connect(null, mapDispatchToProps)(NewExpenseForm);

NewExpenseForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
};
