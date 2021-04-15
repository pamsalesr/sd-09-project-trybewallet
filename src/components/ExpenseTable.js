import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpenseAction } from '../actions/walletAction';

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.editExpense = this.editExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  editExpense(expense) {
    this.setState({ editing: true, ...expense });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
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

  deleteItens(deletedExpense) {
    const { expenses, deleteDispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== deletedExpense.id);
    deleteDispatch(newExpenses);
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="expeses-value">
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
    const { currency } = this.state;
    const { currencies } = this.props;
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
          ))}
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="expenses-payment">
        Método de Pagamento:
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
      <div>
        {this.renderValueInput()}
        {this.renderCurrencySelect()}
        {this.renderPaymentMethod()}
        {this.renderTagSelect()}
        {this.renderDescriptionInput()}
        <button
          type="button"
          onClick={ () => this.handleSubmit() }
        >
          Editar despesa
        </button>
      </div>
    );
  }

  renderExpense() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => {
        const { id, description, currency, tag,
          method, exchangeRates, value } = expense;
        return (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{exchangeRates[currency].name}</td>
            <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>{parseFloat(value * exchangeRates[currency].ask).toFixed(2)}</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.editExpense(expense) }
              >
                Editar
              </button>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => this.deleteItens(expense) }
              >
                Deletar
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    const { editing } = this.state;
    return (
      <div>
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
            { this.renderExpense() }
          </tbody>
        </table>
        { editing && this.renderEditForm() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (expenses) => dispatch(deleteExpense(expenses)),
  editExp: (expense) => dispatch(editExpenseAction(expense)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
