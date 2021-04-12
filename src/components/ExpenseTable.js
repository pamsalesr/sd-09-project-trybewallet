import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, handleNewTotal } from '../actions';

class ExpenseTable extends React.Component {
  deleteExpense(id) {
    const { expenses, dispatchNewExpenses, dispatchNewTotal } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatchNewExpenses(newExpenses);
    const newTotal = newExpenses
      .reduce((totalPrice, expense) => totalPrice + (
        expense.value * parseFloat(expense.exchangeRates[expense.currency].ask)), 0);
    dispatchNewTotal(newTotal);
  }

  tableBody(expenses) {
    return expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
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
        </td>
      </tr>));
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
  dispatchNewTotal: PropTypes.func.isRequired,
  dispatchNewExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNewExpenses: (expenses) => dispatch(deleteExpense(expenses)),
  dispatchNewTotal: (totalPrice) => dispatch(handleNewTotal(totalPrice)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
