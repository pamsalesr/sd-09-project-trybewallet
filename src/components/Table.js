import React, { Component } from 'react';
import Proptypes from 'prop-types';
import '../CSS/wallet.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
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
            { expenses
              .map(({ id, description, method, tag, value, currency, exchangeRates }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{Number(value * exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button type="button">Deletar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      );
    } return null;
  }
}

Table.propTypes = {
  expenses: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default Table;
