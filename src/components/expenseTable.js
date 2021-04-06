import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, updateTotal } from '../actions';

class expenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderExpenses = this.renderExpenses.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
  }

  updateTotal(deleted) {
    const { updateValue, total } = this.props;
    const { value, exchangeRates, currency } = deleted;
    let newTotal = total;
    newTotal = total - (value * exchangeRates[currency].ask);
    updateValue(newTotal);
  }

  deleteItem(deletedExpense) {
    const { removeExpense, expenses } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== deletedExpense.id);
    removeExpense(newExpenses);
    this.updateTotal(deletedExpense);
  }

  renderExpenses() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => {
        const { id, description, tag, method, value } = expense;
        const rates = expense.exchangeRates[expense.currency];
        return (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{rates.name}</td>
            <td>{parseFloat(rates.ask).toFixed(2)}</td>
            <td>{(rates.ask * value).toFixed(2)}</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => {
                  this.deleteItem(expense);
                } }
              >
                <img src="https://www.vhv.rs/dpng/d/287-2875653_recycle-bin-trash-bin-icon-png-transparent-png.png" alt="trash icon" height="15px" />
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        <tbody>
          { this.renderExpenses() }
        </tbody>
      </table>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expenses) => dispatch(deleteExpense(expenses)),
  updateValue: (total) => dispatch(updateTotal(total)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

expenseTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(expenseTable);
