import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableExpenses extends Component {
  constructor(props) {
    super(props);

    this.renderTableBody = this.renderTableBody.bind(this);
  }

  renderTableBody() {
    const { expenses } = this.props;
    const expenseKeys = Object.keys(expenses);
    return (
      <tbody>
        {expenseKeys.map((expense) => (
          <tr key={ Math.random() }>
            <td key={ Math.random() }>{expenses[expense].description}</td>
            <td key={ Math.random() }>{expenses[expense].tag}</td>
            <td key={ Math.random() }>{expenses[expense].method}</td>
            <td key={ Math.random() }>{expenses[expense].value}</td>
            <td key={ Math.random() }>
              {expenses[expense].exchangeRates[expenses[expense].currency].name}
            </td>
            <td key={ Math.random() }>
              {Number(expenses[expense].exchangeRates[expenses[expense].currency].ask)
                .toFixed(2)}
            </td>
            <td key={ Math.random() }>
              {Number(expenses[expense].value
                * expenses[expense].exchangeRates[expenses[expense].currency].ask)
                .toFixed(2)}
            </td>
            <td key={ Math.random() }>Real</td>
            <td key={ Math.random() }>editar/excluir</td>
          </tr>
        ))}
      </tbody>
    );
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
        {this.renderTableBody()}
      </table>
    );
  }
}

const mapStatetoProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableExpenses.propTypes = {
  espenses: PropTypes.objectOf(),
}.isRequered;

export default connect(mapStatetoProps)(TableExpenses);
