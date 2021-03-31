import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveCurrency from '../actions/saveCurrencies';

class inputsField extends Component {
  constructor() {
    super();
    this.currencyKeysRender = this.currencyKeysRender.bind(this);
    this.tagRenderElements = this.tagRenderElements.bind(this);
    this.handleInputs = this.handleInputs.bind(this);

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };
  }

  handleClick(prop) {
    prop(this.state);
    this.setState((prevState) => ({ id: prevState.id + 1, value: '', description: '' }));
  }

  handleInputs({ target: { name, value } }) {
    const { currencies } = this.props;
    this.setState({ [name]: value, exchangeRates: currencies });
  }

  currencyKeysRender() {
    const { currencies } = this.props;
    const currencyKeys = Object.keys(currencies);
    const filter = currencyKeys.filter((currency) => currency !== 'USDT');
    return (
      <select
        data-testid="currency-input"
        id="currency-input"
        name="currency"
        onChange={ this.handleInputs }
      >
        { filter.map((currency) => (
          <option
            value={ currency }
            key={ currency }
            data-testid={ currency }
          >
            { currency }
          </option>)) }
      </select>
    );
  }

  tagRenderElements() {
    return (
      <select
        data-testid="tag-input"
        id="tag-input"
        name="tag"
        onChange={ this.handleInputs }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render() {
    const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { addData } = this.props;
    return (
      <div>
        <span>Valor</span>
        <input
          type="number"
          data-testid="value-input"
          name="value"
          onChange={ this.handleInputs }
        />
        <label htmlFor="currency-input">
          Moeda:
          { this.currencyKeysRender() }
        </label>
        <span>Metodo de pagamento</span>
        <select data-testid="method-input" name="method" onChange={ this.handleInputs }>
          {payment.map((element) => (
            <option value={ element } key={ element }>
              {element}
            </option>))}
        </select>
        <label htmlFor="tag-input">
          Tag:
          { this.tagRenderElements() }
        </label>
        <span>descripção</span>
        <input
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ this.handleInputs }
        />
        <button type="button" onClick={ () => this.handleClick(addData) }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addData: (object) => {
    dispatch(saveCurrency(object));
  },
});

inputsField.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
}.isRequered;

export default connect(mapStateToProps, mapDispatchToProps)(inputsField);
