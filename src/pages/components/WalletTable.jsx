import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpense, updateTotal } from '../../actions';

class WalletTable extends Component {
  constructor(props) {
    super(props);

    this.renderTableRows = this.renderTableRows.bind(this);
    this.reduceTotal = this.reduceTotal.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.deleteExpenseUpdateTotal = this.deleteExpenseUpdateTotal.bind(this);
  }

  deleteExpenseUpdateTotal(e) {
    const { value } = e.target;
    const { expenses, removeExpense, updateNewTotal } = this.props;
    const [deleted] = expenses.filter((expense) => String(expense.id) === value);
    const newTotal = this.updateTotal(deleted);

    removeExpense(value);
    updateNewTotal(newTotal);
  }

  editExpense(e) {
    const { value } = e.target;
    const { editExpense, expenses } = this.props;
    const [clickedExpense] = expenses.filter(({ id }) => value === String(id));
    editExpense(clickedExpense);
  }

  updateTotal(deletedItem) {
    const { value, exchangeRates, currency } = deletedItem;
    const total = this.reduceTotal();

    return total - (value * exchangeRates[currency].ask);
  }

  reduceTotal() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((prev, { value, currency, exchangeRates }) => (
        prev + value * exchangeRates[currency].ask
      ), 0);
    return total;
  }

  renderTableRows() {
    const { expenses } = this.props;
    return expenses.map((item) => (
      <tr key={ item.id }>
        <td>{item.description}</td>
        <td>{item.tag}</td>
        <td>{item.method}</td>
        <td>{parseFloat(item.value).toFixed()}</td>
        <td>{item.exchangeRates[item.currency].name}</td>
        <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
        <td>
          {parseFloat(item.exchangeRates[item.currency].ask * item.value).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            value={ item.id }
            type="button"
            data-testid="delete-btn"
            onClick={ (e) => this.deleteExpenseUpdateTotal(e) }
          >
            Delete
          </button>
          <button
            value={ item.id }
            type="button"
            data-testid="edit-btn"
            onClick={ (e) => this.editExpense(e) }
          >
            Editar
          </button>
        </td>
      </tr>
    ));
  }

  render() {
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
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(deleteExpense(expense)),
  updateNewTotal: (total) => dispatch(updateTotal(total)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  updateNewTotal: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
