import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { saveEmail } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.renderEmailUser = this.renderEmailUser.bind(this);
    this.renderTotalExpenditure = this.renderTotalExpenditure.bind(this);
    this.renderExpenseAmount = this.renderExpenseAmount.bind(this);
    this.renderExpenseDescription = this.renderExpenseDescription.bind(this);
    this.renderSelectCurrency = this.renderSelectCurrency.bind(this);

    this.state = {
      // email: '',
    };
  }

  renderEmailUser(value) {
    return (
      <div>
        <p> Email: </p>
        <field
          data-testid="email-field"
          value={ value }
        />
      </div>
    );
  }

  renderTotalExpenditure(value) {
    if (value === '') {
      return 0;
    }
    return (
      <div>
        <field data-testid="header-currency-field">
          Despesa Total: R$
          <input
            data-testid="total-field"
            placeholder="0"
            value={ value }
          />
        </field>
      </div>
    );
  }

  renderExpenseAmount() {
    return (
      <div>
        <label htmlFor="valor-input">
          Valor das despesas:
          <input
            id="valor-input"
            type="text"
            data-testid="value-input"
            name="email"
            placeholder="0"
          />
        </label>
      </div>
    );
  }

  renderExpenseDescription() {
    return (
      <div>
        <label htmlFor="description-input">
          Descrição das Despesas:
          <textarea
            data-testid="description-input"
            name="description"
            id="description-input"
            cols="30"
            rows="10"
          />
        </label>
      </div>
    );
  }

  renderSelectCurrency() {
    return (
      <div>
        <label htmlFor="currencyInput" data-testid="currency-input">
          Selecionar Moeda:
          {/* falta pegar por requisição */}
          <select id="currencyInput">
            <option value="USD" data-testid="USD">USD</option>
            <option value="CAD" data-testid="CAD">CAD</option>
            <option value="EUR" data-testid="EUR">EUR</option>
            <option value="GBP" data-testid="ARS">ARS</option>
            <option value="BTC" data-testid="BTC">BTC</option>
            <option value="LTC" data-testid="LTC">LTC</option>
            <option value="JPY" data-testid="JPY">JPY</option>
            <option value="CHF" data-testid="CHF">CHF</option>
            <option value="AUD" data-testid="AUD">AUD</option>
            <option value="CNY" data-testid="CNY">CNY</option>
            <option value="ILS" data-testid="ILS">ILS</option>
            <option value="ETH" data-testid="ETH">ETH</option>
            <option value="XRP" data-testid="XRP">XRP</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <header>
          <Link to="/carteira">Carteira</Link>
          { this.renderEmailUser(value) }
          { this.renderTotalExpenditure(value) }
        </header>
        <br />
        <section>
          <form>
            { this.renderExpenseAmount() }
            { this.renderExpenseDescription() }
            { this.renderSelectCurrency() }
          </form>
        </section>
      </div>
    );
  }
}

export default (Wallet);
