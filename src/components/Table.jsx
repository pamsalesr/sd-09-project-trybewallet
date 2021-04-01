import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  createTableRow(expenses) {
    return (
      expenses.map((expense) => {
        const currentCurrency = expense.currency;

        const currentExchangeRate = Object.entries(expense.exchangeRates)
          .find((currency) => currency[0] === currentCurrency)[1].ask;

        const currentCurrencyName = Object.entries(expense.exchangeRates)
          .find((currency) => currency[0] === currentCurrency)[1].name;

        const convertedValue = parseFloat(
          (parseInt(expense.value, 10) * currentExchangeRate).toFixed(2),
        );

        return (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ currentCurrencyName }</td>
            <td>{ parseFloat(currentExchangeRate).toFixed(2) }</td>
            <td>{ parseFloat(convertedValue).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </td>
          </tr>
        );
      })
    );
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
            <th>
              Editar/Excluir
            </th>
          </tr>

        </thead>
        <tbody>
          {
            this.createTableRow(expenses)
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps)(Table);
