import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies,
  setNewExpense,
  getTotalValue,
  setEditableOff,
  updateExpenses,
} from '../actions';
import getCurrencies from '../fetchCurrencies';

class OutcomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleUserInputs = this.handleUserInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createCurrencyOptions = this.createCurrencyOptions.bind(this);
    this.createInputFields = this.createInputFields.bind(this);
    this.createPaymentMethod = this.createPaymentMethod.bind(this);
    this.createTagInput = this.createTagInput.bind(this);
    this.createAddExpenseButton = this.createAddExpenseButton.bind(this);
    this.setEditableExpanseState = this.setEditableExpanseState.bind(this);
  }

  componentDidMount() {
    const { setCurrenciesToState } = this.props;
    setCurrenciesToState();
  }

  setEditableExpanseState() {
    const { editableExpenseState } = this.props;
    this.setState({ ...editableExpenseState });
  }

  createCurrencyOptions() {
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleUserInputs }
        >
          {currencies.map((currency) => (
            <option
              data-testid={ currency }
              key={ currency }
              value={ currency }
            >
              {currency}
            </option>
          ))}
        </select>
      </label>);
  }

  handleUserInputs({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  createInputFields(...args) {
    const [labelName, id, test, type, name, value] = args;
    return (
      <label htmlFor={ id }>
        {labelName}
        <input
          id={ id }
          data-testid={ test }
          type={ type }
          name={ name }
          value={ value }
          onChange={ this.handleUserInputs }
        />
      </label>
    );
  }

  createPaymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleUserInputs }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  createTagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleUserInputs }
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

  async handleClick() {
    const { value, description, currency, method, tag, id } = this.state;
    const { expenses, newExpense, getTotal,
      isButtonEditable, updateExpensesToState } = this.props;
    if (isButtonEditable) {
      console.log('cai no if de fora');
      const updated = expenses.map((expense) => {
        if (expense.id === id) {
          return this.state;
        }
        return expense;
      });
      console.log(updated);
      return updateExpensesToState(updated);
    }
    const updatedCurrencies = await getCurrencies();
    const atualCurrency = updatedCurrencies[currency];
    const expenseObject = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: updatedCurrencies,
    };
    newExpense(expenseObject);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    getTotal(value * parseFloat(atualCurrency.ask));
  }

  createAddExpenseButton() {
    const { isButtonEditable } = this.props;
    return (
      <button
        id="add-expense-button"
        type="button"
        onClick={ this.handleClick }
      >
        {!isButtonEditable ? 'Adicionar despesa' : 'Editar despesa'}
      </button>
    );
  }

  render() {
    const { isEditable, setOff } = this.props;
    const { value, description } = this.state;

    if (isEditable) {
      this.setEditableExpanseState();
      setOff();
    }

    return (
      <form>
        <fieldset>
          { this.createInputFields(
            'Valor: ', 'value',
            'value-input', 'number',
            'value', value,
          ) }
          { this.createInputFields(
            'Descrição: ', 'description',
            'description-input', 'text',
            'description', description,
          ) }
          {this.createCurrencyOptions()}
          {this.createPaymentMethod()}
          {this.createTagInput()}
          {this.createAddExpenseButton()}
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
  totalValue: state.wallet.totalValue,
  isEditable: state.wallet.isEditable,
  isButtonEditable: state.wallet.isButtonEditable,
  editableExpenseState: state.wallet.editableExpense,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrenciesToState: () => dispatch(fetchCurrencies()),
  newExpense: (expenseObj) => dispatch(setNewExpense(expenseObj)),
  getTotal: (value) => dispatch(getTotalValue(value)),
  setOff: () => dispatch(setEditableOff()),
  updateExpensesToState: (object) => dispatch(updateExpenses(object)),
});

OutcomeForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrenciesToState: PropTypes.func.isRequired,
  newExpense: PropTypes.func.isRequired,
  getTotal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isButtonEditable: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  setOff: PropTypes.func.isRequired,
  editableExpenseState: PropTypes.shape({}).isRequired,
  updateExpensesToState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OutcomeForm);
