import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCost, currenciesFetch } from '../actions/index';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class NewCostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.valueInput = this.valueInput.bind(this);
    this.currencyInput = this.currencyInput.bind(this);
    this.methodPaymentInput = this.methodPaymentInput.bind(this);
    this.descriptionCostInput = this.descriptionCostInput.bind(this);
    this.costCenterInput = this.costCenterInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { costs, addExpense, fetchToApi } = this.props;
    const exchangeRates = await fetchToApi();
    const { value, currency, method, description, tag } = this.state;
    const expense = {
      id: (costs.length === 0 ? 0 : costs[costs.length - 1].id + 1),
      value,
      currency,
      method,
      description,
      tag,
      exchangeRates: exchangeRates.coins,
    };
    addExpense(expense);

    this.setState({
      ...initialState,
    });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor
        <input
          type="number"
          name="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyInput() {
    const { currency } = this.state;
    const coins = [
      'USD', 'CAD',
      'EUR', 'GBP',
      'ARS', 'BTC',
      'LTC', 'JPY',
      'CHF', 'AUD',
      'CNY', 'ILS',
      'ETH', 'XRP',
    ];

    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
          id="currency"
        >
          {
            coins.map((moeda) => (
              <option
                key={ moeda }
                value={ moeda }
                data-testid={ moeda }
              >
                { currency }
              </option>
            ))
          }
        </select>
      </label>
    );
  }

  methodPaymentInput() {
    const { method } = this.state;
    return (
      <label htmlFor="methodPayment">
        Método de Pagamento
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
          id="methodPayment"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  descriptionCostInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  costCenterInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Despesa
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
          id="tag-input"
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

  render() {
    return (
      <form>
        { this.valueInput() }
        { this.currencyInput() }
        { this.methodPaymentInput() }
        { this.descriptionCostInput() }
        { this.costCenterInput() }

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  // coins: state.currencies,
  // isFetching: state.isFetching,
  costs: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(currenciesFetch()),
  addExpense: (expense) => dispatch(addCost(expense)),
});

NewCostForm.propTypes = {
  // coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  // isFetching: PropTypes.bool.isRequired,
  costs: PropTypes.arrayOf(PropTypes.object),
  addExpense: PropTypes.func.isRequired,
  fetchToApi: PropTypes.func.isRequired,
};

NewCostForm.defaultProps = {
  costs: [],
  // coins: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCostForm);
