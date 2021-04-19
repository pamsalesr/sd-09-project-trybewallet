import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  renderExpensesInfo(expenses) {
    const renderedExpenses = expenses.map(
      (
        {
          description,
          tag,
          method,
          value,
          currency,
          exchangeRates,
        },
        index,
      ) => (
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
            {(Math.round(value * exchangeRates[currency].ask * 100) / 100).toFixed(2)}
          </td>
          <td>Real</td>
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

ExpensesTable.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
});

export default connect(mapStateToProps, null)(ExpensesTable);
