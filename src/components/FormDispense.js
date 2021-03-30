import React from 'react';
import InputGeneric from './InputGeneric';

class FormDispense extends React.Component {
  constructor(props) {
    super(props);

    this.inputsForm = this.inputsForm.bind(this);
    this.fecthCurrency = this.fecthCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      valueDispense: 0,
      discription: '',
      currencyList: [],
      currencySelected: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    this.fecthCurrency();
  }

  async fecthCurrency() {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currency = await response.json();
      const currencyFiltred = Object.keys(currency)
        .filter((curr) => curr !== 'USDT');
      this.setState({
        currencyList: currencyFiltred,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  inputsForm() {
    const {
      valueDispense,
      discription,
      currencyList,
      currencySelected,
      method,
      tag } = this.state;
    return (
      <div>
        <InputGeneric
          type="number"
          dataTestId="value-input"
          name="valueDispense"
          value={ valueDispense }
          functionChange={ this.handleChange }
        />
        <InputGeneric
          type="text"
          dataTestId="description-input"
          name="discription"
          value={ discription }
          functionChange={ this.handleChange }
        />
        <select data-testid="currency-input" value={ currencySelected }>
          {currencyList.map((currency) => (
            <option key={ currency } data-testid={ currency } value={ currency }>
              {currency}
            </option>
          ))}
        </select>
        <select data-testid="method-input" value={ method }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select data-testid="tag-input" value={ tag }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }

  render() {
    return (
      <section>
        { this.inputsForm() }
        <button type="button">Adicionar despesa</button>
      </section>
    );
  }
}

export default FormDispense;
