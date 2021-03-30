import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import { deleteExpense, setTotalPrice } from '../actions';

class WalletExpenses extends React.Component {
  constructor(props) {
    super(props);

    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(deleteId) {
    const { expenses, dispatchDeleteExpense, dispatchSetTotalPrice } = this.props;
    const filteredExpenses = expenses.filter(
      (expense) => expense.id !== deleteId,
    );
    dispatchDeleteExpense(filteredExpenses);
    const totalPrice = filteredExpenses.reduce((total, expense) => {
      const rates = expense.exchangeRates[expense.currency].ask;
      return total + (rates * expense.value);
    }, 0);
    dispatchSetTotalPrice(totalPrice.toFixed(2));
  }

  render() {
    const { expenses } = this.props;
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
          {expenses.map((expense) => {
            const rates = expense.exchangeRates[expense.currency];
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{rates.name}</td>
                <td>{parseFloat(rates.ask).toFixed(2)}</td>
                <td>{(rates.ask * expense.value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpense: (expenses) => dispatch(deleteExpense(expenses)),
  dispatchSetTotalPrice: (totalPrice) => dispatch(setTotalPrice(totalPrice)),
});

WalletExpenses.propTypes = {
  expenses: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenses);
