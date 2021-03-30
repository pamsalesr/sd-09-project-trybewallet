import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
// import './WalletExpenses.css';

class WalletExpenses extends React.Component {
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
        <tbody>
          {expenses.map((expense) => {
            const rates = expense.exchangeRates[expense.currency];
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{rates.name}</td>
                <td>{parseFloat(rates.ask).toFixed(2)}</td>
                <td>{(rates.ask * expense.value).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletExpenses.propTypes = {
  expenses: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps)(WalletExpenses);
