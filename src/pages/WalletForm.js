import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { expenseThunk } from '../actions/index';

class WalletForm extends Component {
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
    const { currencys } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-input"
          name="currency"
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
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          name="payment"
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
    const { value } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleyForm }
          />
        </label>
        { this.renderSelectCurrency() }
        { this.renderSelectPayment() }
        <label htmlFor="tag-input">
          Categoria:&nbsp;
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            onChange={ this.handleyForm }
          >
            { tags.map((tag, i) => <option value={ tag } key={ i }>{ tag }</option>) }
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição da despesa:&nbsp;
          <input
            data-testid="description-input"
            id="description-input"
            type="text"
            name="description"
            onChange={ this.handleyForm }
          />
        </label>
        <button type="reset" onClick={ this.addExpense }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  thunk: (expanse) => dispatch(expenseThunk(expanse)),
});

WalletForm.propTypes = {
  thunk: func.isRequired,
};

export default connect(null, mapDispatchToProps)(WalletForm);
