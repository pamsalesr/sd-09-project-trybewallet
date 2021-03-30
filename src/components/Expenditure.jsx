import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset, saveCurrencies, setExpense } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
};

class Expenditure extends React.Component {
  constructor(props) {
    super(props);
    const { edit, editExpense } = this.props;
    if (edit) {
      this.state = { ...editExpense[0] };
    } else {
      this.state = INITIAL_STATE;
    }
    this.handleInputs = this.handleInputs.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.editExpense = this.editExpense.bind(this);
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
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
    saveExpense(this.state);
  }

  editExpense() {
    const { resetExpense } = this.props;
    resetExpense(this.state);
  }

  renderSelection(value) {
    const { currencies } = this.props;
    return (
      <select
        value={ value }
        onChange={ this.handleInputs }
        name="currency"
        data-testid="currency-input"
      >
        <option>Selecione uma moeda</option>
        <option value="USD" data-testid="USD">USD</option>
        { currencies.map((coin) => {
          if (coin !== 'USDT' && coin !== 'USD') {
            return (
              <option
                value={ coin }
                data-testid={ coin }
                key={ coin }
              >
                {coin}
              </option>
            );
          }
          return '';
        })}
      </select>
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
    );
  }

  renderTag(value) {
    return (
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
    );
  }

  renderButton(edit) {
    return (
      <button
        type="button"
        onClick={ edit ? this.editExpense : this.saveExpense }
      >
        { edit ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { edit } = this.props;
    return (
      <div>
        <form>
          { this.renderValue(value) }
          { this.renderDescription(description) }
          { this.renderSelection(currency) }
          { this.renderMethod(method) }
          { this.renderTag(tag) }
        </form>
        { this.renderButton(edit) }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(saveCurrencies()),
  saveExpense: (expense) => dispatch(setExpense(expense)),
  resetExpense: (expense) => dispatch(reset(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  edit: state.wallet.edit,
  editExpense: state.wallet.editExpense,
});

Expenditure.propTypes = {
  fetchCurrencies: PropTypes.func,
  saveExpense: PropTypes.func,
  currencies: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expenditure);
