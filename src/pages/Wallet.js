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
    this.renderMethodPayment = this.renderMethodPayment.bind(this);
    this.renderRecreation = this.renderRecreation.bind(this);

    this.state = {
      // email: '',
      currency: ['BRL', 'USD'],
    };
  }

  componentDidMount() {
    this.currencyApi();
  }

  async currencyApi() {
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const response = await result.json();
      delete response.USDT;
      const currencyArray = Object.keys(response);
      this.setState({ currency: currencyArray });
      // console.log(currencyArray);
    } catch (error) {
      console.log(error);
    }
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
    const { currency } = this.state;
    return (
      <div>
        <label htmlFor="currencyInput">
          Selecionar Moeda:
          <select data-testid="currency-input">
            { currency
              .map(
                (curr) => (
                  <option key={ curr } data-testid={ curr }>
                    { curr }
                  </option>
                ),
              )}
          </select>
        </label>
      </div>
    );
  }

  renderMethodPayment() {
    return (
      <div>
        <label htmlFor="method-payment">
          Método De Pagamento:
          <select name="method-payment" id="method-payment" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }

  renderRecreation() {
    return (
      <div>
        <label htmlFor="tag-input">
          Categoria:
          <select name="tag-input" id="tag-input" data-testid="tag-input">
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

  render() {
    const { value } = this.state;
    // console.log(this.state)
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
            { this.renderMethodPayment() }
            { this.renderRecreation() }
            <button type="button" id="button-expense">Adicionar despesa</button>
          </form>
        </section>
        <body>
          <button type="button" data-testid="delete-btn">Excluir</button>
        </body>
      </div>
    );
  }
}

export default (Wallet);
