import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/index';

class ExpensesTable extends React.Component {
  renderExpensesInfo(expenses) {
    const { deleteExpense: deleteThisExpense } = this.props;
    const renderedExpenses = expenses.map(
      ({ id, description, tag, method, value, currency, exchangeRates }, index) => (
        <tr key={ index }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{exchangeRates[currency].name}</td>
          <td>
            {(Math.round(exchangeRates[currency].ask * 100) / 100).toFixed(2)}
          </td>
          <td>
            {(
              Math.round(value * exchangeRates[currency].ask * 100) / 100
            ).toFixed(2)}
          </td>
          <td>Real</td>
          <td>
            <button
              onClick={ (e) => deleteThisExpense({ e, id }) }
              type="button"
              data-testid="delete-btn"
            >
              Excluir
            </button>
          </td>
        </tr>
      ),
    );
    return renderedExpenses;
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
        <tbody>{this.renderExpensesInfo(expenses)}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
  deleteExpense,
};

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExpense: PropTypes.func.isRequired,
};

ExpensesTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
