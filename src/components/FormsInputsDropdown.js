import React from 'react';

class FormsInputsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      paymentMethod: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      expenses: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };

    this.optionsCreator = this.optionsCreator.bind(this);
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => this.currenciesDataToInitials(response));
  }

  currenciesDataToInitials(currenciesData) {
    delete currenciesData.USDT;
    const initials = Object.keys(currenciesData);
    this.setState({ currencies: initials });
  }

  optionsCreator(item) {
    return (
      <option data-testid={ item } key={ item }>{item}</option>
    );
  }

  render() {
    const { currencies, paymentMethod, expenses } = this.state;
    return (
      <forms>
        <label htmlFor="currency">
          <select data-testid="currency-input" id="currency" name="currency">
            {currencies.map((currency) => this.optionsCreator(currency))}
          </select>
        </label>
        <label htmlFor="payment-method">
          <select data-testid="method-input" id="payment-method">
            {paymentMethod.map((method) => this.optionsCreator(method))}
          </select>
        </label>
        <label htmlFor="expense">
          <select data-testid="tag-input" id="expense">
            {expenses.map((expense) => this.optionsCreator(expense))}
          </select>
        </label>
      </forms>
    );
  }
}

export default FormsInputsDropdown;
