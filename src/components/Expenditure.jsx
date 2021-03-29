import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies, setExpense } from '../actions';

class Expenditure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleInputs({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  saveExpense() {
    const { saveExpense } = this.props;
    saveExpense(this.state);
  }

  renderSelection(value) {
    const { currencies } = this.props;
    return (
      <label htmlFor="description-input">
        Moeda:
        <select
          value={ value }
          onChange={ this.handleInputs }
          name="currency"
          data-testid="currency-input"
        >
          <option>Selecione uma moeda</option>
          { currencies
            .map((coin) => (
              coin !== 'USDT' && <option data-testid={ coin }>{ coin }</option>
            ))}
        </select>
      </label>
    );
  }

  renderValue(value) {
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          name="value"
          value={ value }
          onChange={ this.handleInputs }
          data-testid="value-input"
        />
      </label>
    );
  }

  renderDescription(value) {
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          value={ value }
          onChange={ this.handleInputs }
          name="description"
          data-testid="description-input"
        />
      </label>
    );
  }

  renderMethod(value) {
    return (
      <label htmlFor="method-input">
        Método:
        <select
          data-testid="method-input"
          onChange={ this.handleInputs }
          value={ value }
          name="method"
        >
          <option>Selecione uma opção</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag(value) {
    return (
      <label htmlFor="tag-input">
        Categoria (tag)
        <select
          onChange={ this.handleInputs }
          value={ value }
          data-testid="tag-input"
          name="tag"
        >
          <option>Selecione uma opção</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          { this.renderValue(value) }
          { this.renderDescription(description) }
          { this.renderSelection(currency) }
          { this.renderMethod(method) }
          { this.renderTag(tag) }
        </form>
        <button
          type="button"
          onClick={ this.saveExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(saveCurrencies()),
  saveExpense: (expense) => dispatch(setExpense(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Expenditure.propTypes = {
  fetchCurrencies: PropTypes.func,
  saveExpense: PropTypes.func,
  currencies: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expenditure);
