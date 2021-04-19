import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCurrency,
  addExpenses,
  handleTotalPrice,
  editExpenseOff,
  updateExpenses,
} from '../actions';

class AddNewExpense extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.functionEditableExpense = this.functionEditableExpense.bind(this);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatchCurrencyToProps } = this.props;
    dispatchCurrencyToProps();
  }

  functionEditableExpense() {
    const { editableExpenseState } = this.props;
    this.setState({ ...editableExpenseState });
  }

  async requestCurrency() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const object = await response.json();
    delete object.USDT;
    return object;
  }

  async handleClick() {
    const rates = await this.requestCurrency();
    const { value, description, currency, method, tag, id } = this.state;
    const {
      expenses,
      dispatchExpenses,
      dispatchTotalPrice,
      editButtonOn,
      dispatchEdit,
    } = this.props;
    if (editButtonOn) {
      const updatedObject = expenses.map((expense) => {
        if (expense.id === id) {
          return this.state;
        }
        return expense;
      });
      return dispatchEdit(updatedObject);
    }
    const expensesObj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: rates,
    };
    dispatchExpenses(expensesObj);
    dispatchTotalPrice(parseFloat(value) * parseFloat(rates[currency].ask));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleInputs({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  currencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          defaultValue="USD"
          name="currency"
          value={ currency }
          data-testid="currency-input"
          id="currency-input"
          onChange={ ({ target }) => this.handleInputs(target) }
        >
          { currencies.map((coin) => (
            <option key={ coin } value={ coin } data-testid={ coin }>
              { coin }
            </option>
          ))}
        </select>
      </label>
    );
  }

  paymentInput(method) {
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          id="method-input"
          onChange={ ({ target }) => this.handleInputs(target) }
        >
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput(tag) {
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          id="tag-input"
          onChange={ ({ target }) => this.handleInputs(target) }
        >
          <option>Selecione</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  valueInput(value) {
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          name="value"
          value={ value }
          data-testid="value-input"
          id="value-input"
          onChange={ ({ target }) => this.handleInputs(target) }
        />
      </label>
    );
  }

  render() {
    const { value, description, method, tag } = this.state;
    const { isEditable, setEditExpenseOff, editButtonOn } = this.props;
    if (isEditable) {
      this.functionEditableExpense();
      setEditExpenseOff();
    }

    return (
      <div>
        { this.valueInput(value) }
        { this.currencyInput() }
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ ({ target }) => this.handleInputs(target) }
          />
        </label>
        { this.paymentInput(method) }
        { this.tagInput(tag) }
        <button type="button" onClick={ this.handleClick }>
          { !editButtonOn ? 'Adicionar despesa' : 'Editar despesa' }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditable: state.wallet.isEditable,
  editButtonOn: state.wallet.editButtonOn,
  editableExpenseState: state.wallet.editableExpense,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencyToProps: () => dispatch(getCurrency()),
  dispatchExpenses: (expensesObj) => dispatch(addExpenses(expensesObj)),
  dispatchTotalPrice: (value) => dispatch(handleTotalPrice(value)),
  dispatchEdit: (editObject) => dispatch(updateExpenses(editObject)),
  setEditExpenseOff: () => dispatch(editExpenseOff()),
});

AddNewExpense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchCurrencyToProps: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  dispatchTotalPrice: PropTypes.func.isRequired,
  editableExpenseState: PropTypes.objectOf(PropTypes.string).isRequired,
  editButtonOn: PropTypes.bool.isRequired,
  dispatchEdit: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  setEditExpenseOff: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewExpense);
