import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletExpenseTable extends Component {
  renderExpenses(expenses) {
    const expenseInfo = expenses.map(
      ({ description, tag, method, value, currency, exchangeRates }, index) => (
        <tr key={ index }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ (Math.round(exchangeRates[currency].ask * 100) / 100).toFixed(2) }</td>
          <td>
            { (Math.round(value * exchangeRates[currency].ask * 100) / 100).toFixed(2) }
          </td>
          <td>Real</td>
          <td>
            <button type="button">Editar</button>
            <button type="button">Excluir</button>
          </td>
        </tr>
      ),
    );
    return expenseInfo;
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
          { this.renderExpenses(expenses) }
          {/* {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>Dólar Comercial</td>
              <td>{expense.exchangeRates.USD.ask}</td>
              <td>Xablau</td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletExpenseTable.propTypes = {
  expense: PropTypes.objectOf({}),
}.isRequired;

export default connect(mapStateToProps)(WalletExpenseTable);
