import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { convertValue } from '../services';
import {
  deleteExpensesState,
  removeTotalPriceState,
} from '../actions';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);

    this.deleteData = this.deleteData.bind(this);
  }

  deleteData(position) {
    const {
      expensesState,
      deleteExpensesDispatcher,
      removeTotalPriceDispatcher,
    } = this.props;
    const array = [...expensesState];
    let totalPrice = 0;

    array.splice(position, 1);

    array.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      totalPrice = convertValue(
        totalPrice + (value * exchangeRates[currency].ask),
      );
    });

    deleteExpensesDispatcher(array);
    removeTotalPriceDispatcher(totalPrice);
  }

  render() {
    const { expensesState } = this.props;

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
          {expensesState.map((expenses) => {
            const { exchangeRates } = expenses;
            const { name, ask } = exchangeRates[expenses.currency];
            return (
              <tr key={ expenses.id }>
                <td>{ expenses.description }</td>
                <td>{ expenses.tag }</td>
                <td>{ expenses.method }</td>
                <td>{ expenses.value }</td>
                <td>{ name }</td>
                <td>{ convertValue(ask) }</td>
                <td>{ convertValue(expenses.value * ask) }</td>
                <td>Real</td>
                <td>
                  {/* <button type="button">Editar</button> */}
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteData(expenses.id) }
                  >
                    Excluir
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

ExpensesTable.propTypes = {
  expensesState: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpensesDispatcher: (array) => dispatch(deleteExpensesState(array)),
  removeTotalPriceDispatcher: (totalPrice) => dispatch(removeTotalPriceState(totalPrice)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
