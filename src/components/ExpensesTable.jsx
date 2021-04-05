import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpenses, updateTotalValue } from '../actions';

class ExpensesTable extends React.Component {
  deleteExpense(expenseID) {
    const { expenses, updateExpansesDispatcher, updateTotalDispatcher } = this.props;
    const updatedExpenses = expenses
      .filter((expense) => expense.id !== expenseID);
    updateExpansesDispatcher(updatedExpenses);
    const totalValue = updatedExpenses
      .reduce((total, expense) => total + (
        expense.value * parseFloat(expense.exchangeRates[expense.currency].ask)), 0);
    console.log(totalValue);
    updateTotalDispatcher(totalValue);
  }

  renderTableBody() {
    const { expenses } = this.props;
    return expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {(expense.value * parseFloat(expense.exchangeRates[expense.currency].ask))
            .toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => this.deleteExpense(expense.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
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
        <tbody>
          { this.renderTableBody() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpansesDispatcher: (expenses) => dispatch(updateExpenses(expenses)),
  updateTotalDispatcher: (total) => dispatch(updateTotalValue(total)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateExpansesDispatcher: PropTypes.func.isRequired,
  updateTotalDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
