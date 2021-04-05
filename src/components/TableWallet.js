import '../pages/Wallet.css';
import React from 'react';

class TableWallet extends React.Component {
  constructor() {
    super();

    this.inTh = this.inTh.bind(this);
  }

  inTh() {
    const header = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return header.map((element, index) => <th key={ index }>{ element }</th>);
  }

  render() {
    const { inTh } = this;
    return (
      <table className="table">
        <tr className="th">
          { inTh() }
        </tr>
      </table>
    );
  }
}

export default TableWallet;
