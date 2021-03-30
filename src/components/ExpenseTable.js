import React from 'react';

import './ExpenseTable.css';
import TableContent from './TableContent';

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
          <TableContent />
        </tbody>
      </table>
    );
  }
}

export default ExpenseTable;
