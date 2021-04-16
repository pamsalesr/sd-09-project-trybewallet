import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import { handleDelExpense } from '../actions';

class TableExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.generateHeaderExpense = this.generateHeaderExpense.bind(this);
    this.generateExpenseResume = this.generateExpenseResume.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  generateHeaderExpense() {
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

  generateExpenseResume() {
    const { expenses } = this.props;
    return (
      expenses.map((
        { value, description, currency, method, tag, exchangeRates }, index,
      ) => (
        <tr key={ index } name={ index }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ Math.round(100 * exchangeRates[currency].ask) / 100 }</td>
          <td>{ Math.round(value * 100 * (exchangeRates[currency].ask)) / 100 }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              id={ index }
              onClick={ ({ target }) => this.editExpense(target) }
            >
              Editar despesa
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              name={ index }
              onClick={ ({ target }) => this.deleteExpense(target) }
            >
              deletar
            </button>
          </td>
        </tr>
      ))
    );
  }

  deleteExpense(target) {
    const { expenses, delExpense } = this.props;
    const newExpenses = expenses
      .filter((object) => (object.id !== parseFloat(target.name)));
    delExpense(newExpenses);
  }

  render() {
    return (
      <session>
        { this.generateExpenseResume() }
      </session>
    );
  }
}

TableExpenses.propTypes = {
  expenses: arrayOf(),
  delExpense: func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses });

const mapDispatchToProp = (dispatch) => ({
  delExpense: (expense) => dispatch(handleDelExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProp)(TableExpenses);
