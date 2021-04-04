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

  editExpense(expenseid) {
    const { updateEdit } = this.props;
    updateEdit(true, expenseid);
  }

  deleteExpense(expenseid) {
    const { expenses, updateExpenses } = this.props;
    const expensesList = expenses.filter(({ id }) => id !== expenseid);
    updateExpenses(expensesList);
  }

  createButton(label, name, handleClick) {
    return (
      <button
        data-testid={ `${name}-btn` }
        className={ name }
        type="button"
        onClick={ handleClick }
      >
        { label }
      </button>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <tbody className="wallet-table-body">
        {expenses.map((
          { id, value, description, currency, method, tag, exchangeRates }, index,
        ) => (
          <tr className="wallet-table-body-row" key={ index }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ exchangeRates[currency].name }</td>
            <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>{ (value * exchangeRates[currency].ask).toFixed(2)}</td>
            <td>Real</td>
            <td>
              { this.createButton('editar', 'edit', () => this.editExpense(id))}
              { this.createButton('deletar', 'delete', () => this.deleteExpense(id))}
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
