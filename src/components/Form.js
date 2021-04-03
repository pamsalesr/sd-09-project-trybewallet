import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func } from 'prop-types';
import fetchAPI from '../services/api';
import { setCurrencies, setExpenses, addExpense, setEdit } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.createInput = this.createInput.bind(this);
    this.createDropdown = this.createDropdown.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() { this.fetchCurrencies(); }

  async fetchCurrencies() {
    const { updateCurrencies } = this.props;
    const result = await fetchAPI();
    updateCurrencies(result);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  async submitExpense() {
    this.fetchCurrencies();
    const { submit, currencies } = this.props;
    const expense = { ...this.state, exchangeRates: currencies };
    submit(expense);
    this.setState((previous) => ({ id: previous.id + 1, value: 0, description: '' }));
  }

  submitChanges() {
    const { updateExpenses, updateEdit, expenses, editid } = this.props;
    const { id, exchangeRates } = expenses.find((el) => el.id === editid);
    expenses[editid] = { id, ...this.state, exchangeRates };
    updateExpenses([...expenses]);
    updateEdit(false, 0);
  }

  createInput(label, name, type, value) {
    return (
      <label htmlFor={ name }>
        { label }
        <input
          data-testid={ `${name}-input` }
          id={ name }
          type={ type }
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  createDropdown(label, name, value, options) {
    return (
      <label htmlFor={ name }>
        { label }
        <select
          data-testid={ `${name}-input` }
          id={ name }
          value={ value }
          onChange={ this.handleChange }
        >
          {options.map((el) => (
            <option data-testid={ el } value={ el } key={ el }>{ el }</option>
          ))}
        </select>
      </label>
    );
  }

  createButton(name, handleClick) {
    return <button type="button" onClick={ handleClick }>{ name }</button>;
  }

  render() {
    const { currencies, edit } = this.props;
    const currArray = Array.isArray(currencies) ? currencies : Object.keys(currencies);
    const { value, description, currency, method, tag } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        { this.createInput('Valor:', 'value', 'number', value) }
        { this.createDropdown('Moeda:', 'currency', currency, currArray)}
        { this.createDropdown('Método de pagamento:', 'method', method, methods)}
        { this.createDropdown('Tag:', 'tag', tag, tags)}
        { this.createInput('Descrição:', 'description', 'text', description) }
        { edit ? this.createButton('Editar despesa', this.submitChanges)
          : this.createButton('Adicionar despesa', this.submitExpense) }
      </form>
    );
  }
}

Form.propTypes = {
  currencies: arrayOf(),
  expenses: arrayOf(),
  edit: bool,
  updateCurrencies: func,
  submit: func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  edit: wallet.edit,
  editid: wallet.editid,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
  updateExpenses: (expenses) => dispatch(setExpenses(expenses)),
  submit: (expense) => dispatch(addExpense(expense)),
  updateEdit: (condition, id) => dispatch(setEdit(condition, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
