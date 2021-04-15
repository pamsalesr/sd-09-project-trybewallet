import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction, editExpenseAction, currenciesAction } from '../actions';

class ExpenseTable extends React.Component {
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
    this.setState({ editing: true, ...expense });
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
    editExp({ currency, description, exchangeRates, id, method, tag, value });
    this.setState({ editing: false, id });
  }

  deleteItems(deletedExpense) {
    const { expenses, deleteDispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== deletedExpense.id);
    deleteDispatch(newExpenses);
  }

  renderExpenses() {
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
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.deleteItems(expense) }
              >
                Excluir
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="expenses-value">
        <input
          type="number"
          data-testid="value-input"
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
    if (currencies) {
      return (
        <label htmlFor="expenses-currency">
          Moeda:
          <select
            id="expenses-currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((elem) => (
              <option
                data-testid={ elem }
                key={ elem }
                value={ elem }
              >
                {elem}
              </option>
            )) }
          </select>
        </label>
      );
    }
  }

  renderPaymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="expenses-payment">
        Método de pagamento:
        <select
          id="expenses-payment"
          data-testid="method-input"
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
          id="expenses-tag"
          data-testid="tag-input"
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
          type="text"
          id="expenses-description-input"
          data-testid="description-input"
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
      <div>
        <table>
          <thead>
            <tr>
              <td>Descrição</td>
              <td>Tag</td>
              <td>Método de pagamento</td>
              <td>Valor</td>
              <td>Moeda</td>
              <td>Câmbio utilizado</td>
              <td>Valor convertido</td>
              <td>Moeda de conversão</td>
              <td>Editar/Excluir</td>
            </tr>
          </thead>
          <tbody>
            {this.renderExpenses()}
          </tbody>
        </table>
        { editing && this.renderEditForm() }
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteDispatch: PropTypes.func.isRequired,
  editExp: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (expense) => dispatch(deleteExpenseAction(expense)),
  editExp: (expense) => dispatch(editExpenseAction(expense)),
  dispatchCurrencies: (currencies) => dispatch(currenciesAction(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
