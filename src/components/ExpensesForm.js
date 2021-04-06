import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpense } from '../actions';
import './ExpensesForm.css';

const INITIAL_STATE = {
  valueInput: 0,
  currencySelect: 'USD',
  paymentSelect: 'Dinheiro',
  tagSelect: 'Alimentação',
  descriptionInput: '',
  index: 0,
};

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchExchangeRates = this.fetchExchangeRates.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  async fetchExchangeRates() {
    const rates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());

    return rates;
  }

  handleSubmit() {
    const { addExpenseToStore } = this.props;
    const {
      valueInput,
      currencySelect,
      paymentSelect,
      tagSelect,
      descriptionInput,
      index,
    } = this.state;

    this.fetchExchangeRates().then((rates) => {
      const expenses = {
        id: index,
        value: valueInput,
        description: descriptionInput,
        currency: currencySelect,
        method: paymentSelect,
        tag: tagSelect,
        exchangeRates: rates,
      };
      addExpenseToStore(expenses);
    });
    this.setState((state) => ({
      ...INITIAL_STATE,
      valueInput: 0,
      index: state.index + 1,
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderValueInput() {
    const { valueInput } = this.state;
    return (
      <label htmlFor="expenses-value-input">
        Valor:
        <input
          data-testid="value-input"
          type="number"
          id="expenses-value-input"
          name="valueInput"
          value={ valueInput }
          onChange={ this.handleChange }
          className="form-input"
        />
      </label>
    );
  }

  renderCurrencySelect() {
    const { currencies } = this.props;
    const { currencySelect } = this.state;
    return (
      <label htmlFor="expenses-currency-select">
        Moeda:
        <select
          data-testid="currency-input"
          id="expenses-currency-select"
          name="currencySelect"
          value={ currencySelect }
          onChange={ this.handleChange }
          className="form-input"
        >
          { currencies.map((currency) => (
            <option
              data-testid={ currency }
              key={ currency }
              value={ currency }
            >
              { currency }
            </option>
          )) }
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    const { paymentSelect } = this.state;
    return (
      <label htmlFor="expenses-payment-select">
        Método de pagamento:
        <select
          data-testid="method-input"
          id="expenses-payment-select"
          name="paymentSelect"
          value={ paymentSelect }
          onChange={ this.handleChange }
          className="form-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagSelect() {
    const { tagSelect } = this.state;
    return (
      <label htmlFor="expenses-tag-input">
        Tag:
        <select
          data-testid="tag-input"
          id="expenses-tag-input"
          name="tagSelect"
          value={ tagSelect }
          onChange={ this.handleChange }
          className="form-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  renderDescriptionInput() {
    const { descriptionInput } = this.state;
    return (
      <label htmlFor="expenses-description-input">
        Descrição:
        <input
          data-testid="description-input"
          type="text"
          id="expenses-description-input"
          name="descriptionInput"
          value={ descriptionInput }
          onChange={ this.handleChange }
          autoComplete="off"
          className="form-input"
        />
      </label>
    );
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) {
      return (
        <h3>Carregando valores...</h3>
      );
    }
    return (
      <div className="form-container">
        { this.renderValueInput() }
        { this.renderCurrencySelect() }
        { this.renderPaymentMethod() }
        { this.renderTagSelect() }
        { this.renderDescriptionInput() }
        <button
          type="button"
          onClick={ this.handleSubmit }
          className="add-btn"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrency()),
  addExpenseToStore: (expenses) => dispatch(addExpense(expenses)),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  addExpenseToStore: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

ExpensesForm.defaultProps = {
  isFetching: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
