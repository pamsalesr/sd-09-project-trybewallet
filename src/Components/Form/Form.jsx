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
      formControl: {
        value: '',
        currency: '',
        description: '',
        method: '',
        tag: '',
      },
    };
    this.updateFormControl = this.updateFormControl.bind(this);
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

  updateFormControl(field, value) {
    this.setState(({ formControl }) => (
      { formControl: {
        ...formControl,
        [field]: value,
      } }
    ));
  }

  renderValueinput() {
    const { formControl: { value } } = this.state;
    return (
      <InputBox
        id="value-input"
        label="Valor"
        type="text"
        onUpdateForm={ this.updateFormControl }
        value={ value }
      />

    );
  }

  renderCurrencyInput() {
    const { currencies, formControl: { currency } } = this.state;
    return (
      <Dropdown
        id="currency-input"
        options={ currencies }
        label="Moeda"
        onUpdateForm={ this.updateFormControl }
        value={ currency }
      />
    );
  }

  renderDescriptionInput() {
    const { formControl: { description } } = this.state;
    return (
      <InputBox
        id="description-input"
        label="Descrição"
        type="text"
        onUpdateForm={ this.updateFormControl }
        value={ description }
      />
    );
  }

  renderPayMethodInput() {
    const { payMethods, formControl: { method } } = this.state;
    return (
      <Dropdown
        id="method-input"
        options={ payMethods }
        label="Método de pagamento"
        onUpdateForm={ this.updateFormControl }
        value={ method }
      />
    );
  }

  renderCategoriesInput() {
    const { categories, formControl: { tag } } = this.state;
    return (
      <Dropdown
        id="tag-input"
        options={ categories }
        label="Categoria"
        onUpdateForm={ this.updateFormControl }
        value={ tag }
      />
    );
  }

  render() {
    return (
      <form>
        {this.renderValueinput()}
        {this.renderCurrencyInput()}
        {this.renderDescriptionInput()}
        {this.renderPayMethodInput()}
        {this.renderCategoriesInput()}
      </form>
    );
  }
}
