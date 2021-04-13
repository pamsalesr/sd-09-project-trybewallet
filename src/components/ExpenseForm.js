import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrencies from '../services/fetchCurrencies';
import { expenseAction } from '../actions/index';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.getCurrency = this.getCurrency.bind(this);
    this.forms = this.forms.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.forms2 = this.forms2.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      currencies: '',
      loading: true,
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };
  }

  componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const getCurrency = await fetchCurrencies();
    const currenciesArray = Object.keys(getCurrency);
    const newCurrencies = currenciesArray.filter((elem) => elem !== 'USDT');
    this.setState({
      currencies: newCurrencies,
      exchangeRates: getCurrency,
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
    await this.getCurrency();
    const { dispatchExpense } = this.props;
    const { id, value, description, currency, tag, method, exchangeRates } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates,
    };

    dispatchExpense(expense);

    this.setState({
      id: id + 1,
    });
  }

  forms() {
    const { currencies } = this.state;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            value="0"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="description"
            value="0"
            id="description-input"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            value="0"
            onChange={ this.handleChange }
          >
            {currencies.map((curr) => (
              <option data-testid={ curr } key={ curr }>{curr}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  forms2() {
    return (
      <div>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            value="0"
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
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value="0"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
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
        {this.forms()}
        {this.forms2()}
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(expenseAction(expense)),
});

export default connect(null, mapDispatchToProps)(ExpenseForm);
