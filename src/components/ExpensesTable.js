import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableContent = this.renderTableContent.bind(this);
  }

  renderTableHeader() {
    return (
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
    );
  }

  renderTableContent() {
    const { expensesState } = this.props;
    return (
      <table>
        {expensesState.map((expense, key) => (
          <tr key={ key }>
            <td key={ key }>{expense.description}</td>
            <td key={ key }>{expense.tag}</td>
            <td key={ key }>{expense.method}</td>
            <td key={ key }>{expense.value}</td>
            <td key={ key }>
              {expense.exchangeRates[expense.currency].name}
            </td>
            <td key={ key }>
              {Math.round((expense.exchangeRates[expense.currency].ask) * 100) / 100}
            </td>
            <td key={ key }>
              {Math.round((expense.exchangeRates[expense.currency].ask)
              * expense.value * 100) / 100}
            </td>
            <td key={ key }>Real</td>
            <td key={ key }>Ed/Ex</td>
          </tr>
        ))}
      </table>
    );
  }

  render() {
    return (
      <div>
        <table>
          {this.renderTableHeader()}
        </table>
        {this.renderTableContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expensesState: PropTypes.shape([]).isRequired,
};

export default connect(mapStateToProps, null)(ExpensesTable);
