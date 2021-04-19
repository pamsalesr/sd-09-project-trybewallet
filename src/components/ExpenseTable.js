import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleDelete, handleNewTotal, editExpenseOn } from '../actions';

class ExpenseTable extends React.Component {
  tableBody(expenses) {
    return expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {(parseFloat(expense.exchangeRates[expense.currency].ask) * expense.value)
            .toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteExpense(expense.id) }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.editExpense(expense) }
          >
            Editar
          </button>
        </td>
      </tr>));
  }

  deleteExpense(id) {
    const { expenses, dispatchNewExpense, dispatchNewTotal } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatchNewExpense(newExpenses);
    const newTotal = newExpenses
      .reduce((total, expense) => total + (
        expense.value * parseFloat(expense.exchangeRates[expense.currency].ask)), 0);
    dispatchNewTotal(newTotal);
  }

  editExpense(expense) {
    const { dispatchEdit } = this.props;
    dispatchEdit(expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table width="100%">
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
          { this.tableBody(expenses) }
        </tbody>
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchNewExpense: PropTypes.func.isRequired,
  dispatchNewTotal: PropTypes.func.isRequired,
  dispatchEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNewExpense: (expenses) => dispatch(handleDelete(expenses)),
  dispatchNewTotal: (total) => dispatch(handleNewTotal(total)),
  dispatchEdit: (editObject) => dispatch(editExpenseOn(editObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
