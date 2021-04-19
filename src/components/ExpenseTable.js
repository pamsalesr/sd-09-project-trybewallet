import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDeleteExpense, actionEnableEditExpense } from '../actions';

const tableHeaderFields = ['Descrição', 'Tag', 'Método de pagamento',
  'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
  'Moeda de conversão', 'Editar/Excluir'];

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  createTableHeader() {
    return (
      <tr>
        {tableHeaderFields.map((field) => (
          <th key={ field }>{field}</th>
        ))}
      </tr>
    );
  }

  deleteExpense({ target }) {
    const { removeExpense } = this.props;
    removeExpense(parseInt(target.id, 10));
  }

  editExpense({ target }) {
    const { enableEditExpense } = this.props;
    enableEditExpense(parseInt(target.id, 10));
  }

  createExpenseRows() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => {
        const { exchangeRates, currency } = expense;
        //  https://www.devmedia.com.br/javascript-substring-selecionando-parte-de-uma-string/39232

        const currencySelected = exchangeRates[currency].name;
        // const conversionCurrency = currencySelected
        //   .substring(currencySelected.indexOf('/') + 1);
        // const currencyName = currencySelected.substring(0, currencySelected.indexOf('/'));
        const currencyValue = parseFloat(exchangeRates[currency].ask);

        return (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{ expense.value}</td>
            <td>{currencySelected}</td>
            <td>{currencyValue.toFixed(2)}</td>
            <td>{expense.value * exchangeRates[currency].ask}</td>
            <td>Real</td>
            <td>
              <button
                id={ expense.id }
                type="button"
                data-testid="edit-btn"
                onClick={ this.editExpense }
              >
                Editar
              </button>
              <button
                id={ expense.id }
                onClick={ this.deleteExpense }
                type="button"
                data-testid="delete-btn"
              >
                Deletar
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
        <thead>{this.createTableHeader()}</thead>
        <tbody>{this.createExpenseRows()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(actionDeleteExpense(id)),
  enableEditExpense: (id) => dispatch(actionEnableEditExpense(id)),
});

ExpenseTable.propTypes = {
  enableEditExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
