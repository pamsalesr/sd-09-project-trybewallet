import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/components/ExpenseTable.css';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div className="expense-table-container">
        <table className="expense-table">
          <thead className="expense-table-header">
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
          <tbody className="expense-table-body">
            { expenses.map((expense) => (
              <tr key={ `expense-${expense.id}` }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>
                  { (expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button type="button" className="edit-expense-btn">Editar</button>
                  <button type="button" className="delete-expense-btn">Excluir</button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(ExpenseTable);
