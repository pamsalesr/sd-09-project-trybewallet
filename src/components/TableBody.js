import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { setExpenses, setEdit } from '../actions';

class TableBody extends React.Component {
  constructor(props) {
    super(props);
    this.editExpense = this.editExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  editExpense(expenseID) {
    const { updateEdit } = this.props;
    updateEdit(true, expenseID);
  }

  deleteExpense(expenseID) {
    const { expenses, updateExpenses } = this.props;
    const filter = expenses.filter(({ id }) => id !== expenseID);
    updateExpenses(filter);
  }

  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map((
          { id, value, description, currency, method, tag, exchangeRates }, index,
        ) => (
          <tr key={ index }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ exchangeRates[currency].name }</td>
            <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>{ (value * exchangeRates[currency].ask).toFixed(2)}</td>
            <td>Real</td>
            <td>
              <button
                data-testid="edit-btn"
                type="button"
                onClick={ () => this.editExpense(id) }
              >
                editar
              </button>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => this.deleteExpense(id) }
              >
                deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = { expenses: arrayOf(), updateExpenses: func }.isRequired;

const mapStateToProps = ({ wallet }) => ({ expenses: wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  updateExpenses: (expenses) => dispatch(setExpenses(expenses)),
  updateEdit: (condition, id) => dispatch(setEdit(condition, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
