import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';
import './ExpensesTable.css';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.editExpense = this.editExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  editExpense(expense) {
    this.setState({
      editing: true,
      ...expense,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { currency, description, exchangeRates, id, method, tag, value } = this.state;
    const { editExp } = this.props;
    editExp({
      currency,
      description,
      exchangeRates,
      id,
      method,
      tag,
      value,
    });
    this.setState({
      editing: false,
    });
  }

  renderTableRow() {
    const { expenses, deleteExp } = this.props;
    const row = expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ expense.exchangeRates[expense.currency].name }</td>
        <td>{ parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
        <td>
          { (expense.exchangeRates[expense.currency].ask * expense.value).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => this.editExpense(expense) }
          >
            Editar
          </button>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => deleteExp(expense.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
    return row;
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="expenses-value">
        Valor:
        <input
          data-testid="value-input"
          type="number"
          id="expenses-value"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencySelect() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="expenses-currency">
        Moeda:
        <select
          data-testid="currency-input"
          id="expenses-currency"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { currencies.map((acronym) => (
            <option
              data-testid={ acronym }
              key={ acronym }
              value={ acronym }
            >
              { acronym }
            </option>
          )) }
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="expenses-payment">
        Método de pagamento:
        <select
          data-testid="method-input"
          id="expenses-payment"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagSelect() {
    const { tag } = this.state;
    return (
      <label htmlFor="expenses-tag">
        Tag:
        <select
          data-testid="tag-input"
          id="expenses-tag"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="expenses-description">
        Descrição:
        <input
          data-testid="description-input"
          type="text"
          id="expenses-description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
          autoComplete="off"
        />
      </label>
    );
  }

  renderEditForm() {
    return (
      <div className="edit-form">
        { this.renderValueInput() }
        { this.renderCurrencySelect() }
        { this.renderPaymentMethod() }
        { this.renderTagSelect() }
        { this.renderDescriptionInput() }
        <button
          type="button"
          onClick={ () => this.handleSubmit() }
        >
          Editar despesa
        </button>
      </div>
    );
  }

  render() {
    const { editing } = this.state;
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableRow() }
          </tbody>
        </table>
        { editing && this.renderEditForm() }
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  deleteExp: (expense) => dispatch(deleteExpense(expense)),
  editExp: (expense) => dispatch(editExpense(expense)),
});
ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExp: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editExp: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
