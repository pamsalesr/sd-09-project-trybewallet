import '../styles/Wallet.css';
import React from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import { addExpenses, editExpenses, receiveCurrencies, remExpenses } from '../actions';
import getAPI from '../services/currencyAPI';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: 0,
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.inCurrency = this.inCurrency.bind(this);
    this.inMethod = this.inMethod.bind(this);
    this.insertExpenses = this.insertExpenses.bind(this);
    this.inTag = this.inTag.bind(this);
    this.inTh = this.inTh.bind(this);
    this.newInput = this.newInput.bind(this);
    this.newSelect = this.newSelect.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  componentDidMount() { this.fetchAPI(); }

  async fetchAPI() {
    const { getCurrencyDispatch } = this.props;
    const data = await getAPI();
    getCurrencyDispatch(Object.keys(data));
  }

  totalExpenses() {
    const { expenses } = this.props;
    const result = expenses.reduce((prev, curr) => (
      prev + (curr.value * curr.exchangeRates[curr.currency].ask)
    ), 0);
    return (result).toFixed(2);
  }

  inTh() {
    const header = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return header.map((element, index) => <th key={ index }>{ element }</th>);
  }

  insertExpenses() {
    const { expenses, remExpenseDispatcher } = this.props;
    return expenses.map((element) => {
      const info = element.exchangeRates[element.currency];
      return (
        <tr id={ element.id } key={ element.id }>
          <td>{ element.description }</td>
          <td>{ element.tag }</td>
          <td>{ element.method }</td>
          <td>{ element.value }</td>
          <td>{ info.name.split('/', 2)[0] }</td>
          <td>{ parseFloat(info.ask).toFixed(2) }</td>
          <td>{ (element.value * info.ask).toFixed(2) }</td>
          <td>Real</td>
          <td>
            <button
              data-testid="edit-btn"
              type="button"
              onClick={ () => this.handleEdit(element.id) }
            >
              Editar
            </button>
            <button
              id="delete-btn"
              data-testid="delete-btn"
              type="button"
              onClick={ () => remExpenseDispatcher(element.id) }
            >
              Deletar
            </button>
          </td>
        </tr>
      );
    });
  }

  async handleClick(action = 'add') {
    const btnAdd = document.getElementById('btn-add');
    const btnEdit = document.getElementById('btn-edit');
    const { addExpensesDispatcher, editExpensesDispatcher, expenses } = this.props;
    if (action === 'edit') {
      await editExpensesDispatcher({ ...this.state,
        exchangeRates: expenses[0].exchangeRates });
      btnEdit.style.display = 'none';
      btnAdd.style.display = 'inherit';
      return;
    }
    addExpensesDispatcher({ ...this.state, exchangeRates: await getAPI() });
    this.setState((prev) => ({ value: 0, id: prev.id + 1 }));
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleEdit(id) {
    const btnAdd = document.getElementById('btn-add');
    const btnEdit = document.getElementById('btn-edit');
    const { expenses } = this.props;
    const expense = expenses.filter((line) => line.id === id);
    this.setState({
      id: expense[0].id,
      value: expense[0].value,
      description: expense[0].description,
      currency: expense[0].currency,
      method: expense[0].method,
      tag: expense[0].tag,
    });
    btnAdd.style.display = 'none';
    btnEdit.style.display = 'inherit';
  }

  newInput(name, value, data, ...params) {
    const [label, type] = params;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          className={ name }
          data-testid={ data }
          id={ name }
          name={ name }
          onChange={ this.handleChange }
          type={ type }
          value={ value }
        />
      </label>
    );
  }

  inCurrency() {
    const { currencies } = this.props;
    return currencies.map((element, index) => (
      <option data-testid={ element } value={ element } key={ index }>
        { element }
      </option>
    ));
  }

  inMethod() {
    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return method.map((element, index) => (
      <option value={ element } key={ index }>{ element }</option>
    ));
  }

  inTag() {
    const method = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return method.map((element, index) => (
      <option value={ element } key={ index }>{ element }</option>
    ));
  }

  newSelect(id, label, name, ...params) {
    const [state, options] = params;
    return (
      <label htmlFor={ id }>
        { `${label} ` }
        <select
          className={ id }
          data-testid={ id }
          name={ name }
          id={ id }
          value={ state }
          onChange={ this.handleChange }
        >
          { options }
        </select>
      </label>
    );
  }

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { newSelect, inCurrency, inTag, handleClick, inTh, totalExpenses } = this;
    const { email } = this.props;
    return (
      <div className="body">
        <header className="header">
          <h1 className="title">TRYBE</h1>
          <p data-testid="email-field">{ `Email: ${email}` }</p>
          <p data-testid="total-field">{ `Despesa Total: R$ ${totalExpenses()}` }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form className="form">
          { this.newInput('value', value, 'value-input', 'Valor: ', 'number') }
          { newSelect('currency-input', 'Moeda: ', 'currency', currency, inCurrency()) }
          { newSelect('method-input', 'Método de pagamento: ',
            'method', method, this.inMethod())}
          { newSelect('tag-input', 'Tag: ', 'tag', tag, inTag())}
          { this.newInput('description', description,
            'description-input', 'Descrição: ', 'text') }
          <button id="btn-add" type="button" onClick={ () => handleClick() }>
            Adicionar despesa
          </button>
          <button
            id="btn-edit"
            type="button"
            style={ { display: 'none' } }
            onClick={ () => handleClick('edit') }
          >
            Editar despesa
          </button>
        </form>
        <table id="table" className="table">
          <tr className="th">{ inTh() }</tr>
          { this.insertExpenses() }
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { currencies, expenses } }) => ({
  currencies, email, expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpensesDispatcher: (data) => dispatch(addExpenses(data)),
  editExpensesDispatcher: (data) => dispatch(editExpenses(data)),
  getCurrencyDispatch: (data) => dispatch(receiveCurrencies(data)),
  remExpenseDispatcher: (id) => dispatch(remExpenses(id)),
});

Wallet.propTypes = {
  email: string,
  addExpensesDispatcher: func,
  editExpensesDispatcher: func,
  getCurrencyDispatch: func,
  remExpenseDispatcher: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
