import React from 'react';

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.dropDownCreator = this.dropDownCreator.bind(this);
    this.currenciesToState = this.currenciesToState.bind(this);
    this.paymentTypeCreator = this.paymentTypeCreator.bind(this);
    this.state = {
      currencies: {},
    };
  }

  componentDidMount() {
    this.currenciesToState();
  }

  async fetchCurrencies() {
    try {
      const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
      const results = await endpoint.json();
      delete results.USDT;
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async currenciesToState() {
    const currencies = await this.fetchCurrencies();
    this.setState({ currencies });
  }

  dropDownCreator() {
    const { currencies } = this.state;
    const currenciesKeys = Object.keys(currencies);
    return (
      <select data-testid="currency-input">
        {currenciesKeys.map((element) => (
          <option
            value={ element }
            key={ element }
            data-testid={ element }
          >
            {element}
          </option>
        ))}
      </select>
    );
  }

  paymentTypeCreator() {
    return (
      <select data-testid="method-input">
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Valor" data-testid="value-input" />
        <input type="text" placeholder="Descrição" data-testid="description-input" />
        {this.dropDownCreator()}
        {this.paymentTypeCreator()}
      </div>
    );
  }
}

export default ExpensesForm;
