import React, { Component } from 'react';
import { arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import { addTotalExpenses, delExpense } from '../actions';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  getTotal(expenses) {
    const { updateTotalExpense } = this.props;
    const total = expenses.reduce((acc, { value, currency, exchangeRates }) => (
      acc + Number(value * exchangeRates[currency].ask)
    ), 0);
    updateTotalExpense(total);
  }

  getExpensesInfo(currency, exchangeRates, expenseInfo) {
    const entries = Object.entries(exchangeRates);
    const expenseCotation = entries.find((cotation) => cotation[0] === currency);
    return expenseCotation[1][expenseInfo];
  }

  deleteExpense(id) {
    const { expenses, removeExpense } = this.props;
    const updateExpenses = expenses.filter((exp) => id !== exp.id);
    removeExpense(updateExpenses);
    this.getTotal(updateExpenses);
  }

  renderTable() {
    const { expenses } = this.props;
    const labels = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            { labels.map((column) => (
              <th key={ column }>{column}</th>
            )) }
          </tr>
        </thead>
        <tbody>
          { expenses.map(({
            id, description, tag, method, value, currency, exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ this.getExpensesInfo(currency, exchangeRates, 'name')}</td>
              <td>
                {Number(this.getExpensesInfo(currency, exchangeRates, 'ask')).toFixed(2)}
              </td>
              <td>
                {
                  Number(value * this.getExpensesInfo(currency, exchangeRates, 'ask'))
                    .toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button
                  id={ id }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteExpense(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }

  render() {
    return (
      this.renderTable()
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(delExpense(id)),
  updateTotalExpense: (total) => dispatch(addTotalExpenses(total)),
});

ExpensesTable.propTypes = {
  expenses: arrayOf({}),
  removeExpense: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
