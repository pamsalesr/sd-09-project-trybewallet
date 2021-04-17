import React from 'react';
import getCurrencyOptions from '../services/getCurrencyOptions';
import { payMethods, tagExpense } from '../data';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      loading: false,
    };

    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.getCurrencyOptions = this.getCurrencyOptions.bind(this);
    this.renderPaymentMethod = this.renderPaymentMethod.bind(this);
    this.renderTagExpense = this.renderTagExpense.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getCurrencyOptions();
  }

  getCurrencyOptions() {
    this.setState({ loading: true });
    getCurrencyOptions()
      .then((coins) => {
        this.setState({ coins });
        this.setState({ loading: false });
      });
  }

  handleClick() {
    console.log(this.state);
  }

  renderValueInput() {
    return (
      <label htmlFor="value-input">
        Valor da despesa:
        <input
          data-testid="value-input"
          id="value-input"
          name="valueIput"
          type="text"
          /* value={}
          onChange={} */
        />
      </label>
    );
  }

  renderDescriptionInput() {
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          data-testid="description-input"
          id="description-input"
          name="descriptionIput"
          type="text"
          /* value={}
          onChange={} */
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { coins } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select data-testid="currency-input" id="currency-input">
          { coins
            .filter((coin) => coin !== 'USDT')
            .map((coin, index) => (
              <option
                data-testid={ coin }
                key={ index }
                value={ coin }
              >
                { coin }
              </option>)) }
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    return (
      <label htmlFor="method-input">
        Metodo de pagamento:
        <select data-testid="method-input" id="method-input">
          { payMethods
            .map((method, index) => (
              <option
                key={ index }
                value={ method }
              >
                { method }
              </option>)) }
        </select>
      </label>
    );
  }

  renderTagExpense() {
    return (
      <label htmlFor="tag-input">
        Metodo de pagamento:
        <select data-testid="tag-input" id="tag-input">
          { tagExpense
            .map((tag, index) => (
              <option
                key={ index }
                value={ tag }
              >
                { tag }
              </option>)) }
        </select>
      </label>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <p>Carregando</p>;
    }
    return (
      <section>
        <h1>Formulario de adição de despesa</h1>
        { this.renderValueInput() }
        { this.renderDescriptionInput() }
        { this.renderCurrencyInput() }
        { this.renderPaymentMethod() }
        { this.renderTagExpense() }

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

export default ExpenseForm;
