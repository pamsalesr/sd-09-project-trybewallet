import React, { Component } from 'react';
import { arrayOf, number } from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, editExpenseForID, expenseThunk } from '../../actions';
import './editExpenseForm.css';

class EditExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.handleyForm = this.handleyForm.bind(this);
    this.initialState = this.initialState.bind(this);

    this.state = {
      currencys: [],
      value: undefined,
      currency: undefined,
      method: undefined,
      tag: undefined,
      description: undefined,
      exchangeRates: undefined,
    };
  }

  componentDidMount() {
    this.fetchCurrency();
    this.initialState();
  }

  initialState() {
    const { editID, expenses } = this.props;
    const expense = expenses[editID];
    this.setState({
      value: expense.value,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      description: expense.description,
      exchangeRates: expense.exchangeRates,
    });
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

  async editExpense() {
    const { editID } = this.props;
    const { value, currency, method, tag, description, exchangeRates } = this.state;
    const expanse = {
      value, currency, method, tag, description, exchangeRates,
    };
    const { editExpenseID } = this.props;
    editExpenseID(expanse, editID);
  }

  renderSelectCurrency() {
    const { currencys, currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:&nbsp;
        <select
          value={ currency }
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
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:&nbsp;
        <select
          value={ method }
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
    const { value, tag, description } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    // const expense = expenses[editID];
    return (
      <form className="edit-form-container">
        <label htmlFor="value-input">
          Valor:&nbsp;
          <input
            name="value"
            type="number"
            value={ value }
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
            value={ tag }
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
            value={ description }
            name="description"
            type="text"
            data-testid="description-input"
            id="description-input"
            onChange={ this.handleyForm }
          />
        </label>
        <button className="btn btn-primary" type="reset" onClick={ this.editExpense }>
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
  editExpenseID: (expanses, editID) => dispatch(editExpenseForID(expanses, editID)),
});

EditExpenseForm.propTypes = {
  expenses: arrayOf().isRequired,
  editID: number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
