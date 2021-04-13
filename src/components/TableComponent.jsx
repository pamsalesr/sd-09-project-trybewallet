import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class TableComponent extends React.Component {
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
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {/* {this.renderExpensesTable()} */}
        </tbody>
      </table>
    );
  }
}

const mapStatetoProps = (state) => ({
  email: state.user.email,
  // totalPrice: state.wallet.totalPrice,
});

TableComponent.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStatetoProps)(TableComponent);
