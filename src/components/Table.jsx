import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses, convertedValue, currentCurrency, currentExchangeRate } = this.props;

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
            expenses.map((expense, index) => {
              const currentCurrency = expense.currency;
              const currentExchangeRate = Object.entries(expense.exchangeRates)
                .find((currency) => currency[0] === currentCurrency)[1].bid;
              const convertedValue = parseFloat((parseInt(expense.value, 10) * currentExchangeRate).toFixed(2));

              return (
                <tr key={ index }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ currentCurrency }</td>
                  <td>{ currentExchangeRate }</td>
                  <td>{ convertedValue.toFixed(2) }</td>
                  <td>Real Brasileiro</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
