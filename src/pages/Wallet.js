import React from 'react';

class Wallet extends React.Component {
  // constructor(props){
  //   super(props);

  //   //  start
  // }

  headerPage() {
    return (
      <header id="header">
        <div>
          email:
          <span data-testid="email-field" id="header-email">email do usuario</span>
        </div>
        <div>
          despesa total:
          <span data-testid="total-field" id="header-total-expenditure">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }

  renderExpenditureAdd() {
    return (
      <div>
        <label htmlFor="expenditured-add">
          valor da despesa
          <input data-testid="value-input" id="expenditured-add" />
        </label>
      </div>
    );
  }

  renderExpenditureDescription() {
    return (
      <div>
        <label htmlFor="expediture-description">
          descrição da despesa
          <input data-testid="description-input" id="expediture-description" />
        </label>
      </div>
    );
  }

  renderRegisteredCurrency() {
    return (
      <div>
        <label htmlFor="registered-currency">
          moeda
          {/* coletar options da API */}
          <select data-testid="currency-input" id="registered-currency">
            <option data-testid="USD" value="USD">USD</option>
            <option data-testid="CAD" value="CAD">CAD</option>
            <option data-testid="EUR" value="EUR">EUR</option>
            <option data-testid="GBP" value="GBP">GBP</option>
            <option data-testid="ARS" value="ARS">ARS</option>
            <option data-testid="BTC" value="BTC">BTC</option>
            <option data-testid="LTC" value="LTC">LTC</option>
            <option data-testid="JPY" value="JPY">JPY</option>
            <option data-testid="CHF" value="CHF">CHF</option>
            <option data-testid="AUD" value="AUD">AUD</option>
            <option data-testid="CNY" value="CNY">CNY</option>
            <option data-testid="ILS" value="ILS">ILS</option>
            <option data-testid="ETH" value="ETH">ETH</option>
            <option data-testid="XRP" value="XRP">XRP</option>
          </select>
        </label>
      </div>
    );
  }

  renderPaymentMethod() {
    return (
      <div>
        <label htmlFor="payment-method">
          método de pagamento
          <select data-testid="method-input" id="payment-method">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }

  renderExpenditureCategory() {
    return (
      <div>
        <label htmlFor="expenditure-category">
          categoria
          <select data-testid="tag-input" id="expenditure-category">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  renderButtonExpenditureAdd() {
    return (
      <div>
        <button
          type="submit"
          data-testid="total-field"
          id="button-expenditure-add"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }

  render() {
    return (
      <>
        <div>
          { this.headerPage() }
        </div>
        <div>
          <form>
            { this.renderExpenditureAdd() }
            { this.renderExpenditureDescription() }
            { this.renderRegisteredCurrency() }
            { this.renderPaymentMethod() }
            { this.renderExpenditureCategory() }
            { this.renderButtonExpenditureAdd() }
          </form>
        </div>
      </>
    );
  }
}

export default Wallet;
