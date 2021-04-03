import React from 'react';
import { connect } from 'react-redux';
import { string, number, func } from 'prop-types';
import { fatchCurrency, registerNewExpense } from '../actions';
import ExpenseTable from './ExpenseTable';
import FormSendBtn from './FormSendBtn';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { newExpense } = this.props;
    const { name, value } = target;
    newExpense(name, value);
  }

  expenseAmountInput() {
    const { expense } = this.props;
    return (
      <label htmlFor="expense">
        Valor da despesa:
        <input
          name="expense"
          type="number"
          data-testid="value-input"
          onChange={ this.handleChange }
          value={ expense }
        />
      </label>
    );
  }

  descriptionExpenseInput() {
    return (
      <label htmlFor="description">
        Descrição da despesa:
        <textarea
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currenciesSelectInput(currencies) {
    return (
      <label htmlFor="currency">
        Selecione a moeda:
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          <option value="Selecione uma opção...">Selecione uma opção...</option>
          {Object.keys(currencies)
            .filter((currency) => currency !== 'USDT')
            .map((filteredCurrency) => (
              <option
                key={ filteredCurrency }
                data-testid={ filteredCurrency }
                valeu={ filteredCurrency }
              >
                {filteredCurrency}
              </option>))}
        </select>
      </label>
    );
  }

  paymentMethod() {
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Selecione uma opção...">Selecione uma opção...</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  categoryInput() {
    return (
      <label htmlFor="tag">
        TAG:
        <select
          id="tag"
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Selecione uma opção...">Selecione uma opção...</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        {this.expenseAmountInput()}
        {this.descriptionExpenseInput()}
        {this.currenciesSelectInput(currencies)}
        {this.paymentMethod()}
        {this.categoryInput()}
        <FormSendBtn />
        <ExpenseTable />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expense: state.expenseReducer.expense,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fatchCurrency()),
  newExpense: (name, value) => dispatch(registerNewExpense(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  getCurrencies: func,
  newExpense: func,
  expense: number,
  currencies: string,
}.isRequired;
