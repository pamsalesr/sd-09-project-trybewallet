import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { setExpenses, editExpenses } from '../actions';

class ExpensesList extends Component {
  constructor(props) {
    super(props);
    this.btnDelete = this.btnDelete.bind(this);
    this.btnEdit = this.btnEdit.bind(this);
  }

  btnDelete(expenseid) {
    const { expenses, expensesList } = this.props;
    const filter = expenses.filter(({ id }) => id !== expenseid);
    expensesList(filter);
  }

  btnEdit(expenseid) {
    const { editExpense, expenses } = this.props;
    const expense = expenses.find(({ id }) => id === expenseid);

    editExpense(true, expense);
  }

  render() {
    const { expenses } = this.props;
    const edit = this.btnEdit;
    const btn = this.btnDelete;
    return (
      <table>
        <thead>
          <tr className="tr">
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
          {expenses.map((
            { id, value, description, currency, method, tag, exchangeRates }, index,
          ) => (
            <tr key={ index } className="tr trTD">
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
                  <AiFillEdit className="edit" />
                </button>
                <button data-testid="delete-btn" type="button" onClick={ () => btn(id) }>
                  <AiFillCloseCircle className="del" />
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

ExpensesList.propTypes = {
  expensesList: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    forEach: PropTypes.func.isRequired,
    find: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  expensesList: (expenses) => dispatch(setExpenses(expenses)),
  editExpense: (eventEdit, expense) => dispatch(editExpenses(eventEdit, expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
