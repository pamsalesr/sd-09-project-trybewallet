import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableWallet extends React.Component {
  renderTitleTable() {
    return (
      <tr className="tr-title">
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
    );
  }

  renderDatas(data) {
    const { description, tag, method, value, currency, exchangeRates } = data;
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>{Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
        <td>Real</td>
      </tr>
    );
  }

  renderLinesTable() {
    const { listExpenses } = this.props;
    return listExpenses.map((expense) => this.renderDatas(expense));
  }

  render() {
    return (
      <table>
        { this.renderTitleTable() }
        { this.renderLinesTable() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  listExpenses: state.wallet.expenses,
});

TableWallet.propTypes = {
  listExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(TableWallet);
