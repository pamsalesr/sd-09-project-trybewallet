import React, { Component } from 'react';
import { func, arrayOf, number } from 'prop-types';
import { connect } from 'react-redux';
import { expenseThunk } from '../../actions';
import './editExpenseForm.css';

class EditExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.handleyForm = this.handleyForm.bind(this);

    this.state = {
      currencys: [],
      value: '0',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  async fetchCurrency() {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resp = await request.json();
    const currencyArray = Object.values(resp);
    currencyArray.forEach((obj) => {
      if (obj.name !== 'Dólar Turismo') {
        this.setState((prevState) => ({
          currencys: [...prevState.currencys, obj.code],
        }));
      }
    });
  }

  async fetchExpanse() {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resp = await request.json();
    return resp;
  }

  handleyForm({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async addExpense() {
    const { value, currency, payment, tag, description } = this.state;
    const expanses = {
      value,
      currency,
      payment,
      tag,
      description,
    };
    this.setState({ value: '0' });
    const { thunk } = this.props;
    thunk(expanses);
  }

  renderSelectCurrency() {
    const { editID, expenses } = this.props;
    const expense = expenses[editID];
    const { currencys } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:&nbsp;
        <select
          defaultValue={ expense.currency }
          name="currency"
          data-testid="currency-input"
          id="currency-input"
          onChange={ this.handleyForm }
        >
          { currencys.map((code) => (
            <option value={ code } key={ code } data-testid={ code }>
              { code }
            </option>
          )) }
        </select>
      </label>
    );
  }

  renderSelectPayment() {
    const { editID, expenses } = this.props;
    const expense = expenses[editID];
    return (
      <label htmlFor="method-input">
        Método de pagamento:&nbsp;
        <select
          defaultValue={ expense.method }
          name="payment"
          data-testid="method-input"
          id="method-input"
          onChange={ this.handleyForm }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  render() {
    const { editID, expenses } = this.props;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const expense = expenses[editID];
    return (
      <form className="edit-form-container">
        <label htmlFor="value-input">
          Valor:&nbsp;
          <input
            name="value"
            type="number"
            defaultValue={ expense.value }
            data-testid="value-input"
            id="value-input"
            onChange={ this.handleyForm }
          />
        </label>
        { this.renderSelectCurrency() }
        { this.renderSelectPayment() }
        <label htmlFor="tag-input">
          Categoria:&nbsp;
          <select
            defaultValue={ expense.tag }
            name="tag"
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleyForm }
          >
            { tags.map((tag, i) => <option value={ tag } key={ i }>{ tag }</option>) }
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição da despesa:&nbsp;
          <input
            defaultValue={ expense.description }
            name="description"
            type="text"
            data-testid="description-input"
            id="description-input"
            onChange={ this.handleyForm }
          />
        </label>
        <button type="reset" onClick={ this.addExpense }>
          Editar Despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  thunk: (expanse) => dispatch(expenseThunk(expanse)),
});

EditExpenseForm.propTypes = {
  thunk: func.isRequired,
  expenses: arrayOf().isRequired,
  editID: number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
