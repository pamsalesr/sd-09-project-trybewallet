import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction } from '../actions/index';

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderExpenses = this.renderExpenses.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
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

  render() {
    return (
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
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (expense) => dispatch(deleteExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
