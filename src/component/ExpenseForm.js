import React, { Component } from 'react';
import propTypes from 'prop-types';

class ExpenseForm extends Component {
  forms() {
    const { option } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input id="value-input" data-testid="value-input" type="number" />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input id="description-input" data-testid="description-input" type="text" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select id="currency-input" data-testid="currency-input">
            {option}
          </select>
        </label>
        <label htmlFor="method-input">
          Forma de pagamento:
          <select id="method-input" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select id="tag-inputt" ddata-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }

  render() {
    return (this.forms());
  }
}

export default ExpenseForm;

const { arrayOf, shape } = propTypes;
ExpenseForm.propTypes = {
  option: arrayOf(shape()),
};

ExpenseForm.defaultProps = {
  option: {},
};
