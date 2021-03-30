import React from 'react';

import './Form.css'

class Form extends React.Component {
  render() {
    return (
      <form className="container-form" action="">
        <label htmlFor="">
          Valor:
          <input className="input-value" type="number" data-testid="value-input" />
        </label>
        <div>
          <label htmlFor="currency">Moeda</label>
          <select name="currency" id="currency">
            <option value="brl">BRL</option>
            <option value="usd">USD</option>
          </select>
        </div>
        <div>
          <label htmlFor="method">Metodo de pagamento</label>
          <select name="method" id="method" data-testid="method-input">
            <option value="cash">Dinheiro</option>
            <option value="credit-card">'Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </div>
        <div>
          <label htmlFor="tag">Categoria</label>
          <select name="tag" id="tag" data-testid="tag-input">
            <option value="recreation">Lazer</option>
            <option value="work">Trabalho</option>
          </select>
        </div>
        <label htmlFor="">
          Descricao:
          <input type="text" data-testid="description-input" />
        </label>
        <button>Adicionar despesa</button>
      </form>
    );
  }
}

export default Form;
