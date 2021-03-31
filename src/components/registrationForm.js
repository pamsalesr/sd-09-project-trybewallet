import React from 'react';
import fetchApi from '../helpers/fetchApi';

class RegistrationForm extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            name="value"
            data-testid="value-input"
            onChange=""
          />
        </label>
        <label htmlFor="select-currency">
          Moeda
          <select
            name="select-currency"
            data-testid="header-currency-field"
          >
            <option value="BRL" data-testid="BRL">BRL</option>
            <option value="USD">USD</option>
            <option value="TEST">TEST</option>
          </select>
        </label>
        <label htmlFor="method-payment">
          Método de Pagamento
          <select
            name="method-payment"
            data-testid="method-input"
          >
            <option value="money">Dinheiro</option>
            <option value="debit">Cartão de crédito</option>
            <option value="credit">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="value">
          Descrição
          <input
            type="text"
            name="value"
            data-testid="description-input"
            onChange=""
          />
        </label>
        <label htmlFor="cost-center">
          Despesa
          <select
            name="cost-center"
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="recreation">Lazer</option>
            <option value="health">Saúde</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => fetchApi() }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default RegistrationForm;
