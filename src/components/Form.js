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
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Metodo de pagamento
            <select name="method" id="method" data-testid="method-input">
              <option value="cash">Dinheiro</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Categoria
            <select name="tag" id="tag" data-testid="tag-input">
              <option value="recreation">Lazer</option>
            </select>
          </label>
        </div>
        <label htmlFor="description">
          Descricao:
          <input
            type="text"
            id="description"
            data-testid="description-input"
          />
        </label>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

export default Form;
