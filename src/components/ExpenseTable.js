import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
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
          {expenses.map((i) => (
            <tr key={ i.id }>
              <td>{i.description}</td>
              <td>{i.tag}</td>
              <td>{i.method}</td>
              <td>{i.value}</td>
              <td>{i.exchangeRates[i.currency].name}</td>
              <td>
                {parseFloat((i.exchangeRates)[i.currency].ask).toFixed(2)}
              </td>
              <td>
                {parseFloat((i.exchangeRates)[i.currency].ask * i.value).toFixed(2)}
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ExpenseTable);
