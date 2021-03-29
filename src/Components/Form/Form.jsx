import React, { Component } from 'react';
import InputBox from '../InputBox';
import Dropdown from '../Dropdown';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.apiUrl = 'https://economia.awesomeapi.com.br/json/all';
    this.state = {
      currencies: [],
      payMethods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      categories: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    try {
      const resultHttp = await fetch(this.apiUrl);
      const currencies = await resultHttp.json();
      this.setState({
        currencies: Object.keys(currencies).filter((currency) => currency !== 'USDT'),
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { currencies, payMethods, categories } = this.state;

    return (
      <form>
        <InputBox id="value-input" label="Valor" type="text" />
        <Dropdown id="currency-input" options={ currencies } label="Currency" />
        <InputBox id="description-input" label="Descrição" type="text" />
        <Dropdown id="method-input" options={ payMethods } label="Método de pagamento" />
        <Dropdown id="tag-input" options={ categories } label="Categoria" />
      </form>
    );
  }
}
