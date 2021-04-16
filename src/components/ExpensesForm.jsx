import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  addTotalPriceState,
  changeTotalPriceState,
  addExpenseState,
  updateExpenseState,
} from '../actions';
import {
  CurrencyApi,
  convertedToExchange,
  validateFieldsForm,
  updateTotalPrice,
} from '../services';

const INITIAL_STATE = {
  data: {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  },
  disabled: true,
  editor: false,
  idToEdit: 0,
};

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.insertExpense = this.insertExpense.bind(this);
    this.isEditableForm = this.isEditableForm.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && prevProps.editorState !== editorState) {
      this.isEditableForm();
    }
  }

  async fetchCurrencies() {
    const { fetchCurrenciesDispatcher } = this.props;
    fetchCurrenciesDispatcher();
  }

  handleChange({ target: { name, value } }) {
    const actualState = this.state;
    const actualData = actualState.data;

    this.setState(
      {
        ...actualState,
        data: {
          ...actualData,
          [name]: value,
        },
      },
      () => this.setState({ disabled: validateFieldsForm(actualData) }),
    );
  }

  async insertExpense() {
    const currencies = await CurrencyApi();

    const {
      addExpensesDispatcher,
      addTotalPriceDispatcher,
      expensesState,
    } = this.props;

    const { data } = this.state;

    await addExpensesDispatcher({
      ...data,
      id: expensesState.length,
      exchangeRates: currencies,
    });

    addTotalPriceDispatcher(
      convertedToExchange(data.value, currencies[data.currency].ask),
    );

    this.setState({ ...INITIAL_STATE });
  }

  isEditableForm() {
    const { expensesState, editorState, idToEditState } = this.props;
    const actualState = this.state;

    this.setState({
      ...actualState,
      data: { ...expensesState[idToEditState] },
      editor: editorState,
      idToEdit: idToEditState,
    });
  }

  async updateExpense() {
    const { data, idToEdit } = this.state;
    const {
      updateExpenseDispatcher,
      changeTotalPriceDispatcher,
      expensesState,
      totalPriceState,
    } = this.props;

    console.log('currency selected:', data.currency);
    console.log('expenses:', data);

    const editedExpenses = expensesState.map((expense) => {
      if (expense.id === idToEdit) {
        return { ...expense, ...data };
      }
      return expense;
    });

    changeTotalPriceDispatcher(
      updateTotalPrice(expensesState[idToEdit], data, totalPriceState),
    );
    await updateExpenseDispatcher(editedExpenses);
    this.setState(INITIAL_STATE);
  }

  renderInputField(name, text, value) {
    return (
      <label htmlFor={ `${name}-form` }>
        <span>{`${text}:`}</span>
        <input
          type="text"
          name={ name }
          id={ `${name}-form` }
          data-testid={ `${name}-input` }
          required
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderSelectField(name, text, value, array) {
    return (
      <label htmlFor={ `${name}-form` }>
        <span>{`${text}:`}</span>
        <select
          data-testid={ `${name}-input` }
          id={ `${name}-form` }
          name={ name }
          value={ value }
          onChange={ this.handleChange }
        >
          {array && array.map((element) => (
            <option value={ element } key={ element } data-testid={ element }>
              {element}
            </option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const { currenciesState } = this.props;
    const {
      data: { value, currency, method, tag, description },
      disabled,
      editor,
    } = this.state;
    const arrayMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const arrayTag = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    // const currencies = Object.keys(currenciesState);

    return (
      <form>
        {this.renderInputField('value', 'Valor', value)}
        {this.renderSelectField('currency', 'Moeda', currency, currenciesState)}
        {this.renderSelectField(
          'method',
          'Método de Pagamento',
          method,
          arrayMethod,
        )}
        {this.renderSelectField('tag', 'Categoria', tag, arrayTag)}
        {this.renderInputField('description', 'Descrição', description)}
        <button
          type="button"
          onClick={ editor ? this.updateExpense : this.insertExpense }
          disabled={ disabled }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currenciesState: PropTypes.arrayOf(PropTypes.any),
  expensesState: PropTypes.arrayOf(PropTypes.any),
  fetchCurrenciesDispatcher: PropTypes.func,
  addExpensesDispatcher: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  expensesState: state.wallet.expenses,
  editorState: state.wallet.editor,
  idToEditState: state.wallet.idToEdit,
  totalPriceState: state.price.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesDispatcher: () => dispatch(fetchCurrencies()),
  addTotalPriceDispatcher: (totalPrice) => dispatch(addTotalPriceState(totalPrice)),
  changeTotalPriceDispatcher: (totalPrice) => dispatch(changeTotalPriceState(totalPrice)),
  addExpensesDispatcher: (expenses) => dispatch(addExpenseState(expenses)),
  updateExpenseDispatcher: (expenses) => dispatch(updateExpenseState(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
