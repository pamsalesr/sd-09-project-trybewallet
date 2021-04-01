import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  constructor(props) {
    super(props);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidUpdate() {
    this.renderTable();
  }

  renderTable() {
    const { obj } = this.props;
    console.log(Object.keys(obj));
    console.log(obj[Object.keys(obj)[0]].currency);
    Object.keys(obj).map((teste) => (
      <tr key={ teste.id }>
        <td key="description">{ teste.description }</td>
        <td key="tag">{ teste.tag }</td>
        <td key="method">{ teste.method }</td>
        <td key="value">{ teste.value }</td>
        <td key="currency">{ teste.currency }</td>
        <td key="exchangeRates">{ teste.exchangeRates[teste.currency].ask }</td>
        <td key="value">{ (+teste.value * teste.exchangeRates[teste.currency].ask).toFixed(2) }</td>
        <td key="button">Delete</td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
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
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  obj: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
