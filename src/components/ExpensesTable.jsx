import React, { Component } from 'react';
import { arrayOf } from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends Component {
  getExpensesInfo(currency, exchangeRates, expenseInfo) {
    const entries = Object.entries(exchangeRates);
    const expenseCotation = entries.find((cotation) => cotation[0] === currency);
    return expenseCotation[1][expenseInfo];
  }

  renderTable() {
    const { expenses } = this.props;
    const labels = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tr>
          { labels.map((column) => (
            <td key={ column }>{column}</td>
          )) }
        </tr>
        { expenses.map(({
          id, description, tag, method, value, currency, exchangeRates,
        }) => (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ this.getExpensesInfo(currency, exchangeRates, 'name')}</td>
            <td>
              {Number(this.getExpensesInfo(currency, exchangeRates, 'ask')).toFixed(2)}
            </td>
            <td>
              {
                Number(value * this.getExpensesInfo(currency, exchangeRates, 'ask'))
                  .toFixed(2)
              }
            </td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              /
              <button type="button">Excluir</button>
            </td>
          </tr>
        )) }
      </table>
    );
  }

  render() {
    return (
      this.renderTable()
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: arrayOf({}),
}.isRequired;

export default connect(mapStateToProps)(ExpensesTable);
