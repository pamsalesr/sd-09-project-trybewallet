import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseAction, fetchCurrency } from '../actions/walletAction';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.formsOne = this.formsOne.bind(this);
    this.formsTwo = this.formsTwo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.func();
  }

  async func() {
    const { dispatchCurrencies } = this.props;
    await dispatchCurrencies();
    this.isLoadingFalse();
  }

  isLoadingFalse() {
    this.setState({
      loading: false,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { dispatchCurrencies, exchangeRates } = this.props;
    await dispatchCurrencies();
    const { id, value, description, currency, method, tag } = this.state;
    const { expenseDispatch } = this.props;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    expenseDispatch(expense);
    this.setState({
      id: id + 1,
      value: '',
    });
  }

  formsOne() {
    const { value, description, currency } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Despesa:
          <input
            value={ value }
            data-testid="value-input"
            type="number"
            id="value-input"
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição da Despesa:
          <input
            value={ description }
            data-testid="description-input"
            type="text"
            id="description-input"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            value={ currency }
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((coin) => (
              <option data-testid={ coin } key={ coin }>{coin}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  formsTwo() {
    const { method, tag } = this.state;
    return (
      <div>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            value={ method }
            id="method-input"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            value={ tag }
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesas</button>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return 'loading...';
    }
    return (
      <form>
        {this.formsOne()}
        {this.formsTwo()}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenseDispatch: (expense) => dispatch(expenseAction(expense)),
  dispatchCurrencies: () => dispatch(fetchCurrency()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.rates,
});

ExpenseForm.propTypes = {
  expenseDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
