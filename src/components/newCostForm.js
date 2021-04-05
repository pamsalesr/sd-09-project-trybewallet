import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCost, currenciesFetch } from '../actions/index';

const initialState = {
  value: 0,
  coin: 'USD',
  methodPayment: 'Dinheiro',
  description: '',
  costCenter: 'Alimentação',
  coins: [
    'USD',
    'CAD',
    'EUR',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP'],
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
    const exchange = await fetchToApi();
    const { value, coin, methodPayment, description, costCenter } = this.state;
    const expense = {
      id: (costs.length === 0 ? 1 : (costs[costs.length - 1].id + 1)),
      value,
      coin,
      methodPayment,
      description,
      costCenter,
      exchange: exchange.coins,
    };
    addExpense(expense);

    this.setState({
      ...initialState,
    });
  }

  valueInput() {
    return (
      <label htmlFor="value">
        Valor
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyInput() {
    const { coins } = this.state;
    return (
      <label htmlFor="select-currency">
        Moeda
        <select
          name="coin"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {
            coins.map((coin) => (
              <option
                value={ coin }
                key={ coin }
                data-testid={ coin }
              >
                { coin }
              </option>
            ))
          }
        </select>
      </label>
    );
  }

  methodPaymentInput() {
    const { methodPayment } = this.state;
    return (
      <label htmlFor="methodPayment">
        Método de Pagamento
        <select
          name="methodPayment"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ methodPayment }
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
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  costCenterInput() {
    return (
      <label htmlFor="costCenter">
        Despesa
        <select
          name="costCenter"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="food">Alimentação</option>
          <option value="recreation">Lazer</option>
          <option value="health">Saúde</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
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
  costs: state.expenses,
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
