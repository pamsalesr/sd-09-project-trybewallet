import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { convertValue } from '../services';

class ExpensesTable extends React.Component {
  render() {
    const { expensesState } = this.props;

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
          {expensesState.map((expenses) => {
            const { id, value, currency, method, tag, description, exchangeRates } = expenses;
            const exchangeRatesSelected = exchangeRates[currency];
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{exchangeRatesSelected.name}</td>
                <td>{convertValue(exchangeRatesSelected.ask)}</td>
                <td>{convertValue(value * exchangeRatesSelected.ask)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

// ExpensesTable.propTypes = {
//   expensesState: PropTypes.string,
// }.isRequired;

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
