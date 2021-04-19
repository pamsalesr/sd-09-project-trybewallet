import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  addExpenseWithCurrentQuotes,
  setDropdownCurrencies,
  actionEditExpense,
} from '../actions';

const INITIAL_STATE = {
  value: 0,
  currency: 'ILS',
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
  currencies: [],
  paymentMethod: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  expenses: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  isEditing: false,
  editingId: null,
};

class WalletForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };

    this.optionsCreator = this.optionsCreator.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { setUpCurrencies } = this.props;
    setUpCurrencies();
  }

  componentDidUpdate() {
    const { isEditing } = this.state;
    const { editingExpense: { isEditableMode, id } } = this.props;
    if (isEditableMode && !isEditing) {
      const { expenses } = this.props;
      const expense = expenses.find((element) => element.id === id);
      console.log(expense);
      this.getExpenseData(expense);
    }
  }

  getExpenseData(expense) {
    console.log(expense);
    this.setState({
      ...expense,
      isEditing: true,
    });
  }

  editExpense = () => {
    const { editExpense } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    console.log('Editou');
    const expenseEdited = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    editExpense(expenseEdited);
    this.setState({ ...INITIAL_STATE });
  }

  editExpenseButton = () => (
    <button type="button" onClick={ this.editExpense }>
      Editar despesa
    </button>
  )

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  optionsCreator(item) {
    return (
      <option data-testid={ item } key={ item }>{item}</option>
    );
  }

  inputTextCreator(name, text, stateKey) {
    return (
      <label htmlFor={ name }>
        {text}
        <input
          type="text"
          data-testid={ `${name}-input` }
          name={ name }
          id={ name }
          value={ stateKey }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  dropDownCreator(name, keyToIterate, keyValue) {
    return (
      <label htmlFor={ name }>
        <select
          data-testid={ `${name}-input` }
          id={ name }
          name={ name }
          onChange={ this.handleChange }
          value={ keyValue }
        >
          {keyToIterate.map((element) => this.optionsCreator(element))}
        </select>
      </label>
    );
  }

  expenseCreator() {
    const { expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { length } = expenses;
    const newExpense = {
      id: (length > 0) ? (expenses[length - 1].id + 1) : 0,
      value,
      description,
      currency,
      method,
      tag,
    };
    this.setState({ ...INITIAL_STATE });
    return newExpense;
  }

  addExpenseButton() {
    const { addExpense } = this.props;
    return (
      <button type="button" onClick={ () => addExpense(this.expenseCreator()) }>
        Adicionar despesa
      </button>);
  }

  async fetchCurrencyQuotes() {
    const fetchCurrency = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await fetchCurrency.json();
    return response;
  }

  render() {
    const {
      paymentMethod,
      expenses,
      value,
      description,
      currency,
      isEditing,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        {this.inputTextCreator('value', 'Valor da despesa', value)}
        {this.inputTextCreator('description', 'Descrição da despesa', description)}
        {this.dropDownCreator('currency', currencies, currency)}
        {this.dropDownCreator('method', paymentMethod)}
        {this.dropDownCreator('tag', expenses)}
        {isEditing ? this.editExpenseButton() : this.addExpenseButton() }
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseWithCurrentQuotes(expense)),
  setUpCurrencies: () => dispatch(setDropdownCurrencies()),
  editExpense: (id) => dispatch(actionEditExpense(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  editingExpense: state.wallet.editingExpense,
});

WalletForms.propTypes = {
  addExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.shape({
    isEditableMode: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  setUpCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForms);
