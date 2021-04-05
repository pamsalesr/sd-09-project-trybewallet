import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRowAction, sumExpensesAction } from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidUpdate() {
    this.updateExpensesSum();
  }

  updateExpensesSum() {
    const { sumExpenses, expenses } = this.props;

    const expensesSum = expenses
      .map((expense) => {
        const currentCurrency = expense.currency;
        const currentExchangeRate = Object.entries(expense.exchangeRates)
          .find((currency) => currency[0] === currentCurrency)[1].ask;

        const valueToBRL = (parseInt(expense.value, 10) * currentExchangeRate);

        return parseFloat(valueToBRL.toFixed(2));
      })
      .reduce((acc, current) => acc + current, 0);

    sumExpenses(expensesSum);
  }

  handleDeleteClick(expenseId, deleteRow) {
    deleteRow(expenseId);
  }

  createTableRow(expenses, deleteRow) {
    return (
      expenses.map((expense) => {
        const currentCurrency = expense.currency;

        const currentExchangeRate = Object.entries(expense.exchangeRates)
          .find((currency) => currency[0] === currentCurrency)[1].ask;

        const currentCurrencyName = Object.entries(expense.exchangeRates)
          .find((currency) => currency[0] === currentCurrency)[1].name;

        const convertedValue = parseFloat(
          (parseInt(expense.value, 10) * currentExchangeRate).toFixed(2),
        );

        return (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ currentCurrencyName }</td>
            <td>{ parseFloat(currentExchangeRate).toFixed(2) }</td>
            <td>{ parseFloat(convertedValue).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handleDeleteClick(expense.id, deleteRow) }
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
    const { expenses, deleteRow } = this.props;

    return (
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
            <th>
              Editar/Excluir
            </th>
          </tr>

        </thead>
        <tbody>
          {
            this.createTableRow(expenses, deleteRow)
          }
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteRow: (expenseId) => dispatch(deleteRowAction(expenseId)),
  sumExpenses: (expensesSum) => dispatch(sumExpensesAction(expensesSum)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
