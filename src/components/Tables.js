import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { receiveExpenses, totalExpenses, editExpenses } from '../actions';

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.expensesTable = this.expensesTable.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
  }

  expensesTable() {
    return (
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
    );
  }

  removeExpense(id) {
    const { expenses, totalExpensesDispatch, receiveExpensesDispatch } = this.props;
    const arrayExpense = expenses.filter((expense) => expense.id !== id);
    const reduceTotal = arrayExpense
      .reduce((total, { value, currency, exchangeRates }) => {
        const moeda = exchangeRates[currency].ask;
        const round = Math.round((moeda * value) * 100) / 100;
        return round + total;
      }, 0);
    receiveExpensesDispatch(arrayExpense);
    totalExpensesDispatch(reduceTotal);
  }

  render() {
    const { expenses, editExpensesDispatch } = this.props;
    return (
      <table>
        { this.expensesTable() }
        <tbody>
          { expenses.map((expense, index) => {
            const { value, description, currency, id,
              method, tag, exchangeRates } = expense;
            const moeda = exchangeRates[currency].ask;
            const moedaRound = Math.round(moeda * 100) / 100;
            const round = Math.round((moeda * value) * 100) / 100;
            return (
              <tr key={ index }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{method}</td>
                <td>{ value }</td>
                <td>{ moedaRound.toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ round }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editExpensesDispatch(id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeExpense(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  receiveExpensesDispatch: (expenses) => dispatch(receiveExpenses(expenses)),
  totalExpensesDispatch: (total) => dispatch(totalExpenses(total)),
  editExpensesDispatch: (idToEdit) => dispatch(editExpenses(idToEdit)),
});

Tables.propTypes = {
  expenses: PropTypes.number.isRequired,
  totalExpensesDispatch: PropTypes.number.isRequired,
  receiveExpensesDispatch: PropTypes.arrayOf.isRequired,
  editExpensesDispatch: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Tables);
