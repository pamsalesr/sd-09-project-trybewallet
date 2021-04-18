import React, { Component } from 'react';
/* import { connect } from 'react-redux'; */
import getCurrencies from '../../services/api';
/* import { addExpense } from '../../actions'; */
import './styles.css';

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.valueInput = this.valueInput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.currencyInput = this.currencyInput.bind(this);
    this.methodInput = this.methodInput.bind(this);
    this.tagInput = this.tagInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const apiCurrencies = await getCurrencies();
    this.setState({
      currencies: Object.keys(apiCurrencies),
    });
  }

  valueInput() {
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="text"
          data-testid="value-input"
        />
      </label>
    );
  }

  descriptionInput() {
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          data-testid="description-input"
        />
      </label>
    );
  }

  currencyInput() {
    const { currencies } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-input"
        >
          {
            currencies.map((currency) => ((currency !== 'USDT') ? (
              <option
                key={ currency }
                value={ currency }
                data-testid={ currency }
              >
                { currency }
              </option>
            ) : ''))
          }
        </select>
      </label>
    );
  }

  methodInput() {
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
        >
          <option key="dinheiro">Dinheiro</option>
          <option key="credito">Cartão de crédito</option>
          <option key="debito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput() {
    return (
      <label htmlFor="tag-input">
        Categoria:
        <select
          data-testid="tag-input"
          id="tag-input"
        >
          <option key="alimentacao">Alimentação</option>
          <option key="lazer">Lazer</option>
          <option key="trabalho">Trabalho</option>
          <option key="transporte">Transporte</option>
          <option key="saude">Saúde</option>
        </select>
      </label>
    );
  }

  submitInput() {
    return (
      <input
        type="submit"
        value="Adicionar despesa"
        onClick={ this.submitExpense }
      />
    );
  }

  submitExpense() {
    this.fetchCurrencies();
  }

  /* async submitExpense() {
    const getCurrenciesCotation = await this.fetchCurrencies
  } */

  render() {
    return (
      <form>
        { this.valueInput() }
        { this.descriptionInput() }
        { this.currencyInput() }
        { this.methodInput() }
        { this.tagInput() }
        { this.submitInput() }
      </form>
    );
  }
}

/* const mapDispatchToProps = (dispatch) => ({

}); */

/* export default connect(null, mapDispatchToProps)(TransactionForm); */

export default TransactionForm;
