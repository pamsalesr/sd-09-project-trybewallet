import React, { Component } from 'react';
import { arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';
import { delExpense } from '../actions';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  getExpensesInfo(currency, exchangeRates, expenseInfo) {
    const entries = Object.entries(exchangeRates);
    const expenseCotation = entries.find((cotation) => cotation[0] === currency);
    return expenseCotation[1][expenseInfo];
  }

  deleteExpense(id, total) {
    const { removeExpense } = this.props;
    removeExpense(id, total);
  }

  renderTable() {
    const { expenses } = this.props;
    const labels = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tr>
          { labels.map((column) => (
            <td key={ column }>{column}</td>
          )) }
        </tr>
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
                onClick={ () => this.deleteExpense(
                  id,
                  -Number(value * this.getExpensesInfo(currency, exchangeRates, 'ask')),
                ) }
              >
                Excluir
              </button>
            </td>
          </tr>
        )) }
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
  removeExpense: (id, total) => dispatch(delExpense(id, total)),
});

ExpensesTable.propTypes = {
  expenses: arrayOf({}),
  removeExpense: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
