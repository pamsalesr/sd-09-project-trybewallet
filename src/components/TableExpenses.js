import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletedExpense, editRequest } from '../actions';

class TableExpenses extends Component {
  constructor(props) {
    super(props);

    this.renderTableBody = this.renderTableBody.bind(this);
  }

  handleDelete(filter) {
    const { expenses, deleteExpense } = this.props;
    const filteredExpenses = expenses.filter((expense) => expense.id !== filter.id);
    deleteExpense(filteredExpenses);
  }

  handleEdit(expense) {
    const { expenseToEdit } = this.props;
    expenseToEdit(expense);
  }

  renderTableBody() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map((expense) => (
          <tr key={ Math.random() }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>
              {expense.exchangeRates[expense.currency].name}
            </td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td>
              {Number(expense.value
                * expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.handleEdit(expense) }
              >
                Editar
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handleDelete(expense) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
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
        {this.renderTableBody()}
      </table>
    );
  }
}

const mapStatetoProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenses) => dispatch(deletedExpense(expenses)),
  expenseToEdit: (expense) => dispatch(editRequest(expense)),
});

TableExpenses.propTypes = {
  espenses: PropTypes.arrayOf(PropTypes.object),
}.isRequered;

export default connect(mapStatetoProps, mapDispatchToProps)(TableExpenses);
