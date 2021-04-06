import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends Component {
  renderRow() {
    const { expenses } = this.props;

    const row = expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ expense.exchangeRates[expense.currency].name }</td>
        <td>{ parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
        <td>
          { (expense.exchangeRates[expense.currency].ask * expense.value).toFixed(2) }
        </td>
        <td>Real</td>
      </tr>
    ));
    return row;
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
          { this.renderRow() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(ExpenseTable);
