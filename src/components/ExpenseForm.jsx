import React from 'react';

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
        <label htmlFor="moeda">
          Moeda
          <select name="moeda" id="moeda" data-testid="currency-input">
            <option value="USD">USD</option>
          </select>
        </label>
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
