import React, { Component } from 'react';

export default class ExpensesForm extends Component {
  constructor() {
    super();

    this.state = {
      currency: [],
    };

    this.getCurrency = this.getCurrency.bind(this);
    this.currencyinput = this.currencyinput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.expenseValueInput = this.expenseValueInput.bind(this);
    this.methodInput = this.methodInput.bind(this);
    this.tagInput = this.tagInput.bind(this);
  }

  componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      console.log(`result: ${result.json()}`);

      this.setState({ currency: result });
    } catch (error) {
      console.log(error);
    }
  }

  expenseValueInput() {
    return (
      <label htmlFor="value-input">
        Valor da despesa
        <input
          type="number"
          data-testid="value-input"
          id="value-input"
        />
      </label>
    );
  }

  descriptionInput() {
    return (
      <label htmlFor="description-input">
        Descrição da despesa
        <input
          type="text"
          data-testid="description-input"
          id="description-input"
        />
      </label>
    );
  }

  currencyinput() {
    const { currency } = this.state;
    return (
      // currency.map((value, key) => (
      //   <p key={ key }>{ value }</p>
      // ))
      console.log(`render: ${currency}`)
      // <label htmlFor="currency-input">
      //   Moeda
      //   <select data-testid="currency-input" id="currency-input">
      //   </select>
      // </label>
    );
  }

  methodInput() {
    return (
      <label htmlFor="method-input">
        Método de pagamento
        <select data-testid="method-input" id="method-input">
          <option value="cash" data-testid="">Dinheiro</option>
          <option value="credit" data-testid="">Cartão de crédito</option>
          <option value="debit" data-testid="">Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput() {
    return (
      <label htmlFor="tag-input">
        Tipo da despesa
        <select data-testid="tag-input" id="tag-input">
          <option value="">Alimentação</option>
          <option value="">Lazer</option>
          <option value="">Trabalho</option>
          <option value="">Transporte</option>
          <option value="">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <form className="expenses-form">
        <h2>Despesas</h2>
        { this.expenseValueInput() }
        { this.descriptionInput() }
        { this.currencyinput() }
        { this.methodInput() }
        {}
        <button type="submit" onClick="#">
          Adicionar despesa
        </button>
      </form>
    );
  }
}
