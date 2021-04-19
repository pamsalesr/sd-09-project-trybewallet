import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpense, fetchCurrencies } from '../../actions';
import InputExpense from './InputExpense';

const INITIAL_STATE = {
  value: 0,
  currency: 'USD',
  description: '',
  method: 'money',
  tag: 'food',
};
const METHOD_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAG_OPTIONS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.handleInput = this.handleInput.bind(this);
  }

  addThisExpense() {
    const { fetchExpense: dispatchExpense } = this.props;
    dispatchExpense(this.state);
    this.setState(INITIAL_STATE);
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  renderOptions(name, options) {
    const { [name]: nameState } = this.state;
    return (
      <select
        onChange={ (e) => this.handleInput(e) }
        name={ name }
        value={ nameState }
        data-testid={ `${name}-input` }
        id={ name }
      >
        {options.map((option, index) => (
          <option key={ index } value={ option }>
            {option}
          </option>
        ))}
      </select>
    );
  }

  renderCurrencyOptions() {
    const { currencies } = this.props;
    const options = currencies.map(({ codein, code: currency }, index) => {
      if (currency !== 'USDT' && codein !== 'BRLT') {
        return (
          <option data-testid={ currency } key={ index } value={ currency }>
            {currency}
          </option>
        );
      }
      return null;
    });
    return options;
  }

  renderSelectCurrencies() {
    const { isFetching } = this.props;
    const { currency } = this.state;
    return (
      <select
        onChange={ (e) => this.handleInput(e) }
        data-testid="currency-input"
        value={ currency }
        name="currency"
        id="currency"
      >
        {isFetching ? null : this.renderCurrencyOptions()}
      </select>
    );
  }

  renderInput(name) {
    const { [name]: nameState } = this.state;
    return (
      <InputExpense
        name={ name }
        value={ nameState }
        onChange={ this.handleInput }
      />
    );
  }

  renderButtonAddExpense() {
    return (
      <button onClick={ () => this.addThisExpense() } type="button">
        Adicionar despesa
      </button>
    );
  }

  render() {
    return (
      <div>
        {this.renderInput('value')}
        {this.renderInput('description')}
        {this.renderSelectCurrencies()}
        {this.renderOptions('method', METHOD_OPTIONS)}
        {this.renderOptions('tag', TAG_OPTIONS)}
        {this.renderButtonAddExpense()}
        <span>
          <br />
          Despesas:&nbsp;
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = {
  fetchExpense,
  fetchCurrencies,
};

ExpenseForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
