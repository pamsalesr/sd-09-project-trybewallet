import React, { Component } from 'react';

export default class ExpensesForm extends Component {
  render() {
    return (
      <form className="expenses-form">
        <h2>Despesas</h2>
        <label htmlFor="value-input">
          Valor da despesa
          <input
            type="number"
            data-testid="value-input"
            id="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição da despesa
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select data-testid="currency-input" id="currency-input">
            <option value="" data-testid="">valores vindos da API</option>
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento
          <select data-testid="method-input" id="method-input">
            <option value="cash" data-testid="">Dinheiro</option>
            <option value="credit" data-testid="">Cartão de crédito</option>
            <option value="debit" data-testid="">Cartão de débito</option>
          </select>
        </label>
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
        <button type="submit" onClick="#">
          Adicionar despesa
        </button>
      </form>
    );
  }
}
