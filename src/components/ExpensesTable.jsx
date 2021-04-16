import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteExpenseState,
  changeTotalPriceState,
  editExpense,
} from '../actions';
import { aroundPriceChange, convertedToExchange } from '../services';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);

    this.deleteData = this.deleteData.bind(this);
    this.editData = this.editData.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  deleteData(position) {
    const {
      expensesState,
      deleteExpensesDispatcher,
      changeTotalPriceDispatcher,
    } = this.props;

    const deleteExpense = expensesState.filter((expense) => (
      expense.id !== position
    ));
    deleteExpensesDispatcher(deleteExpense);

    let totalPrice = 0;
    deleteExpense.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      totalPrice += (convertedToExchange(value, exchangeRates[currency].ask));
    });

    changeTotalPriceDispatcher(totalPrice);
  }

  editData(position) {
    const { editExpenseDispatcher } = this.props;
    editExpenseDispatcher(true, position);
  }

  handleButton(testID, callback, text) {
    return (
      <button
        type="button"
        data-testid={ testID }
        onClick={ callback }
      >
        {text}
      </button>
    );
  }

  tableHeader() {
    return (
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
    );
  }

  render() {
    const { expensesState } = this.props;

    return (
      <table>
        {this.tableHeader()}
        <tbody>
          {expensesState.map((expense) => {
            const { [expense.currency]: { ask, name } } = expense.exchangeRates;
            return (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ name }</td>
                <td>{ (aroundPriceChange(ask)).toFixed(2) }</td>
                <td>{ (convertedToExchange(expense.value, ask)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  {this.handleButton(
                    'edit-btn',
                    () => this.editData(expense.id),
                    'Editar',
                  )}
                  {this.handleButton(
                    'delete-btn',
                    () => this.deleteData(expense.id),
                    'Excluir',
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expensesState: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenseDispatcher: (
    (editor, idToEdit) => dispatch(editExpense(editor, idToEdit))
  ),
  deleteExpensesDispatcher: (
    (expenses) => dispatch(deleteExpenseState(expenses))
  ),
  changeTotalPriceDispatcher: (
    (totalPrice) => dispatch(changeTotalPriceState(totalPrice))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
