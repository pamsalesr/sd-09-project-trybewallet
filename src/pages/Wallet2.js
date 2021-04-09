import React from 'react';

export default function Wallet2() {
  return (
    <div>
      <label htmlFor="currency"><span> Moeda: </span>
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          defaultValue="default"
          onChange={ (e) => this.handleInputChange(e.target) }
        >
          <option disabled value="default"> Selecione </option>
          {cSelect}
        </select>
        </label>
        <label htmlFor="method-input">
        <span>Método de Pagamento: </span>
        <select
          data-testid="method-input"
          name="method"
          id="method-input"
          defaultValue="default"
          onChange={ (e) => this.handleInputChange(e.target) }
        >
          <option disabled value="default"> Selecione </option>
          <option value="Dinheiro"> Dinheiro </option>
          <option value="Cartão de crédito"> Cartão de crédito </option>
          <option value="Cartão de débito"> Cartão de débito </option>
        </select>
      </label>
        <label htmlFor="tag"><span>Tag: </span>
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
          defaultValue="default"
          onChange={ (e) => this.handleInputChange(e.target) }
        >
          <option disabled value="default"> Selecione </option>
          <option value="Alimentação"> Alimentação </option>
          <option value="Lazer"> Lazer </option>
          <option value="Trabalho"> Trabalho </option>
          <option value="Transporte"> Transporte </option>
          <option value="Saúde"> Saúde </option>
        </select>
      </label>
        <label htmlFor="description"><span>Descrição: </span>
        <input
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ (e) => this.handleInputChange(e.target) }
        />
        </label>
    </div>
  )
};
