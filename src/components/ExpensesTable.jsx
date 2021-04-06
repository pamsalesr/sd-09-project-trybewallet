import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.expensesTable = this.expensesTable.bind(this);
  }

  expensesTable() {
    const { expenses } = this.props;

    return expenses.map((currentExpense) => {
      const rates = currentExpense.exchangeRates[currentExpense.currency];

      return (
        <tr key={ currentExpense.id }>
          <td>{currentExpense.description}</td>
          <td>{currentExpense.tag}</td>
          <td>{currentExpense.method}</td>
          <td>{currentExpense.value}</td>
          <td>{rates.name}</td>
          <td>{parseFloat(rates.ask).toFixed(2)}</td>
          <td>{(rates.ask * currentExpense.value).toFixed(2)}</td>
          <td>Real</td>
        </tr>
      );
    });
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
          { this.expensesTable() }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(Object),
};

ExpensesTable.defaultProps = {
  expenses: [],
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
