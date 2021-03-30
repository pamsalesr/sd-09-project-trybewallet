import React from 'react';

import './ExpenseTable.css';

class ExpenseTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descricao</th>
            <th>Tag</th>
            <th>Metodo de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Cambio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversao</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>Xablau</td>
            <td>Lazer</td>
            <td>Dinheiro</td>
            <td>5.00</td>
            <td>USD</td>
            <td>Dolar</td>
            <td>32.00</td>
            <td>Reais</td>
            <td>Editar/Excluir</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ExpenseTable;
