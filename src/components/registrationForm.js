import React from 'react';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.valueInput = this.valueInput.bind(this);
    this.currencyInput = this.currencyInput.bind(this);
    this.methodPaymentInput = this.methodPaymentInput.bind(this);
    this.descriptionCostInput = this.descriptionCostInput.bind(this);
    this.costCenterInput = this.costCenterInput.bind(this);
  }

  valueInput() {
    return (
      <label htmlFor="value">
        Valor
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange=""
        />
      </label>
    );
  }

  currencyInput() {
    return (
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
    );
  }

  methodPaymentInput() {
    return (
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
    );
  }

  descriptionCostInput() {
    return (
      <label htmlFor="value">
        Descrição
        <input
          type="text"
          name="value"
          data-testid="description-input"
          onChange=""
        />
      </label>
    );
  }

  costCenterInput() {
    return (
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
    );
  }

  render() {
    return (
      <form>
        { this.valueInput() }
        { this.currencyInput() }
        { this.methodPaymentInput() }
        { this.descriptionCostInput() }
        { this.costCenterInput() }

        <button
          type="button"
          onClick=""
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default RegistrationForm;
