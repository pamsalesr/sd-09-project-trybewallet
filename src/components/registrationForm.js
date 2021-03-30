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
          <select name="select-currency" data-testid="header-currency-field">
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
            <option value="TEST">TEST</option>
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
