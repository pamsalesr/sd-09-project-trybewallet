import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/walletAction';

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderExpense = this.renderExpense.bind(this);
    this.deleteItens = this.deleteItens.bind(this);
  }

  deleteItens(deletedExpense) {
    const { expenses, deleteDispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== deletedExpense.id);
    deleteDispatch(newExpenses);
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (expenses) => dispatch(deleteExpense(expenses)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
