import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const headerTable = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class expenseTable extends React.Component {

  createTdTag(array) {
    return array.map((item, i) => (
      <td key={ i }>{item}</td>
    ));
  }

  render() {
    return (
      <table>
        <thead>
          {this.createTdTag(headerTable)}
        </thead>

        <tbody>
          <td></td>
        </tbody>
      </table>
    );
  }
}

export default connect()(expenseTable);
