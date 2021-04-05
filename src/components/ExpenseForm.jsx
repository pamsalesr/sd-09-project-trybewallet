import React from 'react';
import CurrencySelect from './CurrencySelect';

class ExpenseForm extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="despesa">
          Valor da despesa
          <input type="text" name="despesa" data-testid="value-input" />
        </label>
        <label htmlFor="descricao">
          descrição da despesa
          <input type="text" name="descricao" data-testid="description-input" />
        </label>
        <CurrencySelect />
        <label htmlFor="pagamento">
          Método de pagamento
          <select name="pagamento" id="pagamento" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartaoCredito">Cartão de crédito</option>
            <option value="cartaoDebito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tipoDespesa">
          Tipo de despesa
          <select name="tipoDespesa" id="despesa" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

export default ExpenseForm;
