import React from 'react';
import { Pagamento, moedas, categorias } from './arrays';

function forms() {
  return (
    <form>
      <label htmlFor="despesa">
        Valor:
        <input
          data-testid="value-input"
          type="number"
          id="despesa"
        />
      </label>
      <label htmlFor="descrition">
        Descrição:
        <input
          type="text"
          id="descrition"
          data-testid="description-input"
        />
      </label>
      <label htmlFor="moeda">
        Moeda:
        <select data-testid="currency-input" id="moeda">
          {moedas.map((value) => (
            <option data-testid={ value } key={ value }>{ value }</option>
          ))}
        </select>
      </label>
      <label htmlFor="pag">
        Método de Pagamento:
        <select data-testid="method-input" id="pag">
          {Pagamento.map((value) => (
            <option key={ value }>{ value }</option>
          ))}
        </select>
      </label>
      <label htmlFor="cat">
        Método de Pagamento:
        <select data-testid="tag-input" id="cat">
          {categorias.map((categoria) => (
            <option key={ categoria }>{ categoria }</option>
          ))}
        </select>
      </label>
    </form>
  );
}

export default forms;
