import React from 'react';

import './Form.css';

class Form extends React.Component {
  render() {
    return (
      <form className="container-form" action="">
        <label htmlFor="value">
          Valor:
          <input
            className="input-value"
            id="value"
            type="number"
            name="value"
            data-testid="value-input"
          />
        </label>
        <div>
          <label htmlFor="currency">
            Moeda
            <select name="currency" id="currency">
              <option value="brl">BRL</option>
              <option value="usd">USD</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Metodo de pagamento
            <select name="method" id="method" data-testid="method-input">
              <option value="cash">Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Categoria
            <select name="tag" id="tag" data-testid="tag-input">
              <option value="recreation">Lazer</option>
              <option value="work">Trabalho</option>
            </select>
          </label>
        </div>
        <label htmlFor="description">
          Descricao:
          <input
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
          />
        </label>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

export default Form;
