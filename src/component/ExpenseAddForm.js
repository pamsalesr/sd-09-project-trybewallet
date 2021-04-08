import React from 'react';

export default class ExpenseAddForm extends React.Component {
  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Real</td>
            <td>Editar/Excluir</td>
          </tr>
        </table>
      </div>
    );
  }
}
