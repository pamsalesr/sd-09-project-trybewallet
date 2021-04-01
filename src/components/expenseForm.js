import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, getCurrencies } from '../actions';

class expenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderExpenseInput = this.renderExpenseInput.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getCurrencies() {
    const { dispatchCurrencies } = this.props;
    await dispatchCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    await this.getCurrencies();
    const { value, description, currency, tag, method } = this.state;
    const { dispatchExpense, expenses, currenciesList } = this.props;
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates: currenciesList,
    };

    dispatchExpense(expense);

    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  renderCurrencies(currency) {
    const { currenciesList } = this.props;
    const currencies = Object.keys(currenciesList);
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          <option key="default">Selecione uma moeda</option>
          { (currencies)
            .filter((coin) => coin !== 'USDT')
            .map((coin) => (
              <option
                value={ coin }
                data-testid={ coin }
                key={ coin }
              >
                {coin }
              </option>
            ))}
        </select>
      </label>
    );
  }

  renderExpenseInput(value) {
    return (
      <label htmlFor="expenses">
        Valor:
        <input
          data-testid="value-input"
          id="value"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderMethod(method) {
    return (
      <label htmlFor="method">
        Método de Pagamento:
        <select
          data-testid="method-input"
          id="method"
          name="method"
          onChange={ this.handleChange }
          value={ method }
        >
          <option key="default">Selecione o método de pagamento</option>
          <option key="cash">Dinheiro</option>
          <option key="credit-card">Cartão de crédito</option>
          <option key="debit-card">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag(tag) {
    return (
      <label htmlFor="tag">
        tag:
        <select
          data-testid="tag-input"
          id="tag"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option key="default">Selecione a tag</option>
          <option key="food">Alimentação</option>
          <option key="fun">Lazer</option>
          <option key="work">Trabalho</option>
          <option key="transport">Transporte</option>
          <option key="health">Saúde</option>
        </select>
      </label>
    );
  }

  renderDescription(description) {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          data-testid="description-input"
          id="description"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  render() {
    const { value, description, currency, tag, method } = this.state;
    return (
      <div className="expense-form">
        { this.renderExpenseInput(value) }
        { this.renderCurrencies(currency) }
        { this.renderMethod(method) }
        { this.renderTag(tag) }
        { this.renderDescription(description) }
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currenciesList: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(addExpense(expense)),
  dispatchCurrencies: () => dispatch(getCurrencies()),
});

expenseForm.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  dispatchCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  currenciesList: PropTypes.objectOf(String).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(expenseForm);
