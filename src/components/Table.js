import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { getExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { getExpenses.map((field) => (
            <tr key={ field.id }>
              <td>{field.description}</td>
              <td>{field.tag}</td>
              <td>{field.method}</td>
              <td>{field.value}</td>
              <td>{field.exchangeRates[field.currency].name}</td>
              <td>{(parseFloat(field.exchangeRates[field.currency].ask)).toFixed(2)}</td>
              <td>
                {(field.value * field.exchangeRates[field.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  getExpenses: state.wallet.expenses,
});

Table.propTypes = {
  getExpenses: PropTypes.arrayOf('').isRequired,
};
export default connect(mapStateToProps)(Table);
