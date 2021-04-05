import React from 'react';

class ReleaseTable extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     expenses
  //   }
  // }
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
            <th>Câmbio</th>
            <th>Valor Convertido</th>
            <th>Moeda de Conversão</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
      </table>
    );
  }
}

export default ReleaseTable;
