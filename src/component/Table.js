import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesUpdate, activeEditButton } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.dropExpense = this.dropExpense.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
  }

  dropExpense(item) {
    const { expenses, dispatchExpensesUpdate } = this.props;
    const reNew = expenses.filter((expense) => (item !== expense.id));
    dispatchExpensesUpdate(reNew);
  }

  updateExpense(item) {
    const { dispatchEditButton } = this.props;
    dispatchEditButton(true, item);
  }

  dropRealBrasileiro(element) {
    const content = element.exchangeRates[element.currency].name;
    const testCorrection = 30;
    const newContent = content.slice(0, (testCorrection + content.indexOf('/')));
    return newContent;
  }

  renderHeader() {
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

  renderLine() {
    const { expenses } = this.props;
    return expenses.map((element) => (
      <tr key={ element.id }>
        <td>{ element.description }</td>
        <td>{ element.tag }</td>
        <td>{ element.method }</td>
        <td>{ element.value }</td>
        <td>{ this.dropRealBrasileiro(element) }</td>
        <td>{ parseFloat(element.exchangeRates[element.currency].ask).toFixed(2) }</td>
        <td>
          {(element.value * element.exchangeRates[element.currency].ask).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            id={ `update-button-${element.id}` }
            onClick={ () => this.updateExpense(element.id) }
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            id={ `drop-button-${element.id}` }
            onClick={ () => this.dropExpense(element.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        { this.renderHeader() }
        <tbody>
          { this.renderLine() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpensesUpdate: (expenses) => dispatch(expensesUpdate(expenses)),
  dispatchEditButton:
  (editButton, expenseId) => dispatch(activeEditButton(editButton, expenseId)),
});

Table.propTypes = {
  expenses: PropTypes.func,
  dispatchExpensesUpdate: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
