import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyExpenses, fetchCurrencyList, addExpend } from '../actions';

const firstState = {
  currency: 'USD',
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
  value: '',
};

class WalletExpends extends React.Component {
  constructor(props) {
    super(props);
    this.state = firstState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitExpenses = this.handleSubmitExpenses.bind(this);
  }

  componentDidMount() {
    const { fetchAPICurrency } = this.props;
    fetchAPICurrency();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmitExpenses() {
    const { fetchAPIExpenses, submitExpenses } = this.props;
    await fetchAPIExpenses();
    submitExpenses(this.state);
    this.setState(firstState);
  }

  createJSXInputValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          name="value"
          data-testid="value-input"
          onChange={ (event) => this.handleChange(event) }
          value={ value }
        />
      </label>
    );
  }

  createJSXDropdownPaymentMethods() {
    const arrayOfPaymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          data-testid="method-input"
          onChange={ (event) => this.handleChange(event) }
        >
          {arrayOfPaymentMethods.map((method) => (
            <option
              data-testid={ method }
              key={ method }
              value={ method }
            >
              {method}
            </option>))}
        </select>
      </label>
    );
  }

  createJSXDropdownCurrencies() {
    const { currencies } = this.props;
    const filteredCurrencies = currencies.filter((removeCurr) => removeCurr !== 'USDT');
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          onChange={ (event) => this.handleChange(event) }
        >
          {filteredCurrencies.map((currency) => (
            <option
              data-testid={ currency }
              key={ currency }
              value={ currency }
            >
              {currency}
            </option>))}
        </select>
      </label>
    );
  }

  createJSXDropdownTags() {
    const arrayOfTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          data-testid="tag-input"
          onChange={ (event) => this.handleChange(event) }
        >
          {arrayOfTags.map((tag) => (
            <option
              data-testid={ tag }
              key={ tag }
              value={ tag }
            >
              {tag}
            </option>))}
        </select>
      </label>
    );
  }

  createJSXInputDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          name="description"
          data-testid="description-input"
          onChange={ (event) => this.handleChange(event) }
          value={ description }
        />
      </label>
    );
  }

  render() {
    return (
      <fieldset>
        {this.createJSXInputValue()}
        {this.createJSXDropdownCurrencies()}
        {this.createJSXDropdownPaymentMethods()}
        {this.createJSXDropdownTags()}
        {this.createJSXInputDescription()}
        <button type="button" onClick={ () => this.handleSubmitExpenses() }>
          Adicionar despesa
        </button>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  { fetchAPIExpenses: () => dispatch(fetchCurrencyExpenses()),
    fetchAPICurrency: () => dispatch(fetchCurrencyList()),
    submitExpenses: (state) => dispatch(addExpend(state)),
  }
);

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

WalletExpends.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  fetchAPIExpenses: PropTypes.func,
  fetchCurrencyList: PropTypes.func,
  submitExpend: PropTypes.fund,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpends);
