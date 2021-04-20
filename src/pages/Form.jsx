import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleMoveToState, handleCurrencies, setOffIsEditable,
  handleAddExpense, handleEditExpense } from '../actions';
import fetchApi from '../services/api';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '', value: 0, tag: '', method: '', currency: 'USD', id: 0,
    };
    this.valueInput = this.valueInput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.currencyOptions = this.currencyOptions.bind(this);
    this.paymentMethod = this.paymentMethod.bind(this);
    this.categoryOptions = this.categoryOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.updateState = this.updateState.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate() {
    const { isEditable, setOffEditableDisp } = this.props;
    if (isEditable) this.updateState();
    setOffEditableDisp();
  }

  async fetchApi() {
    const { currenciesRates } = this.props;
    currenciesRates(Object.keys(await fetchApi()));
  }

  updateState() {
    const { editableState: { description, value, id, tag,
      currency, exchangeRates, method } } = this.props;
    this.setState((state) => ({
      ...state,
      description,
      value,
      id,
      currency,
      tag,
      exchangeRates,
      method,
    }));
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          id="value"
          name="value"
          onChange={ this.handleChange }
          value={ value }
        />
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descriçao
        <input
          type="text"
          data-testid="description-input"
          id="description"
          name="description"
          onChange={ this.handleChange }
          value={ description }
        />
      </label>
    );
  }

  currencyOptions() {
    const { currRates } = this.props;
    if (currRates !== undefined) {
      return (
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
          >
            {currRates.map((curr) => (
              <option
                data-testid={ curr }
                key={ curr }
                value={ curr }
                id={ curr }
              >
                { curr }
              </option>
            ))}
          </select>
        </label>
      );
    }
  }

  paymentMethod() {
    return (
      <label htmlFor="method">
        Método de Pagamento
        <select
          data-testid="method-input"
          id="method"
          onChange={ this.handleChange }
        >
          <option defaultValue hidden>Escolha</option>
          <option key="money" value="Dinheiro">Dinheiro</option>
          <option key="credit-card" value="Cartão de crédito">Cartão de crédito</option>
          <option key="debit-card" value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  categoryOptions() {
    return (
      <label htmlFor="tag">
        Categoria
        <select
          data-testid="tag-input"
          id="tag"
          onChange={ this.handleChange }
        >
          <option defaultValue hidden>Escolha</option>
          <option key="food" defaultValue value="Alimentação">Alimentação</option>
          <option key="fun" value="Lazer">Lazer</option>
          <option key="work" value="Trabalho">Trabalho</option>
          <option key="transport" value="Transporte">Transporte</option>
          <option key="health" value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  async submitExpense() {
    const { editButton, editableState: { id }, addExpenses,
      editExpenseDisp } = this.props;
    if (editButton) {
      editExpenseDisp({ ...this.state, id });
    } else {
      addExpenses({ ...this.state, exchangeRates: await fetchApi() });
      this.setState((state) => ({ id: state.id + 1, value: 0, description: '' }));
    }
  }

  changeButton() {
    const { editButton } = this.props;
    return !editButton
      ? (
        <button type="button" onClick={ this.submitExpense }>
          Adicionar despesa
        </button>
      )
      : (
        <button type="button" onClick={ this.submitExpense }>
          Editar despesa
        </button>
      );
  }

  render() {
    return (
      <form>
        { this.valueInput() }
        { this.descriptionInput() }
        { this.currencyOptions() }
        { this.paymentMethod() }
        { this.categoryOptions() }
        { this.changeButton() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currRates: state.wallet.currencies,
  expenses: state.wallet.expenses,
  email: state.user.email,
  editableState: state.wallet.globalState,
  isEditable: state.wallet.isEditable,
  editButton: state.wallet.editButton,
});

const mapDispatchToProp = (dispatch) => ({
  currenciesRates: (currencies) => dispatch(handleCurrencies(currencies)),
  globalStateDisp: (object) => dispatch(handleMoveToState(object)),
  addExpenses: (expense) => dispatch(handleAddExpense(expense)),
  editExpenseDisp: (dataState) => dispatch(handleEditExpense(dataState)),
  setOffEditableDisp: () => dispatch(setOffIsEditable()),
});

Form.propTypes = {
  currenciesRates: PropTypes.func,
  addExpenses: PropTypes.func,
  convertExp: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProp)(Form);
