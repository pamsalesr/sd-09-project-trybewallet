import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { setExpenses } from '../actions';

class TBody extends React.Component {
  constructor(props) {
    super(props);
    this.editExpense = this.editExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  editExpense(expenseID) { return expenseID; }

  deleteExpense(expenseID) {
    const { expenses, updateExpenses } = this.props;
    const filter = expenses.filter(({ id }) => id !== expenseID);
    updateExpenses(filter);
  }

  render() {
    const { expenses } = this.props;
    const edit = this.editExpense;
    const del = this.deleteExpense;
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
              <button data-testid="edit-btn" type="button" onClick={ () => edit(id) }>
                editar
              </button>
              <button data-testid="delete-btn" type="button" onClick={ () => del(id) }>
                deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

TBody.propTypes = { expenses: arrayOf().isRequired, updateExpenses: func.isRequired };
const mapStateToProps = ({ wallet }) => ({ expenses: wallet.expenses });
const mapDispatchToProps = (dispatch) => (
  { updateExpenses: (expenses) => dispatch(setExpenses(expenses)) }
);
export default connect(mapStateToProps, mapDispatchToProps)(TBody);
