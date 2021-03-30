import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import InputGeneric from './InputGeneric';
import expensesAction from '../actions/expensesAction';

class FormDispense extends React.Component {
  constructor(props) {
    super(props);

    this.inputsForm = this.inputsForm.bind(this);
    this.fecthCurrency = this.fecthCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: 0,
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      currencyList: [],
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

  handleClick() {
    const { expensesAction: sendData } = this.props;
    sendData(this.state);
    this.setState((oldState) => ({
      id: oldState.id + 1,
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
    }));
  }

  inputsForm() {
    const {
      value,
      description,
      currencyList } = this.state;
    return (
      <div>
        <InputGeneric
          type="number"
          dataTestId="value-input"
          name="value"
          value={ value }
          functionChange={ this.handleChange }
        />
        <InputGeneric
          type="text"
          dataTestId="description-input"
          name="description"
          value={ description }
          functionChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          <option value="">Selecione a moeda</option>
          {currencyList.map((currency) => (
            <option key={ currency } data-testid={ currency } value={ currency }>
              {currency}
            </option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    return (
      <section>
        { this.inputsForm() }
        <select
          data-testid="method-input"
          onChange={ this.handleChange }
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ this.handleChange }
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </section>
    );
  }
}

const mapDispatchToProps = {
  expensesAction,
};

FormDispense.propTypes = {
  expensesAction: func.isRequired,
};

export default connect(null, mapDispatchToProps)(FormDispense);
