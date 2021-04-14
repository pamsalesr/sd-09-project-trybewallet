import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const tableInfo = [
  ['Descrição', (x) => x.description],
  ['Tag', (x) => x.tag],
  ['Método de pagamento', (x) => x.method],
  ['Valor', (x) => x.value],
  ['Moeda', (x) => x.exchangeRates[x.currency].name],
  ['Câmbio utilizado', (x) => parseFloat(x.exchangeRates[x.currency].ask).toFixed(2)],
  ['Valor convertido', (x) => (x.exchangeRates[x.currency].ask * x.value).toFixed(2)],
  ['Moeda de conversão', () => 'Real'],
];

class SpendingTable extends React.Component {
  infoRow(spendingEntry) {
    return (
      <tr key={ spendingEntry.id }>
        {
          tableInfo.map((x, index2) => (
            <td key={ index2 }>
              {
                (x[1])(spendingEntry)
              }
            </td>
          ))
        }
        <td />
      </tr>
    );
  }

  spendingHeader() {
    return (
      <tr>
        {
          tableInfo.map((x, index) => (
            <th key={ index }>
              {
                x[0]
              }
            </th>
          ))
        }
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  render() {
    const { spendings } = this.props;
    return (
      <table>
        <thead>
          {
            this.spendingHeader()
          }
        </thead>
        <tbody>
          {
            spendings.map((spending) => this.infoRow(spending))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  spendings: state.wallet.expenses,
});

SpendingTable.propTypes = {
  spendings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      codein: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
      low: PropTypes.string.isRequired,
      varBid: PropTypes.string.isRequired,
      pctChange: PropTypes.string.isRequired,
      bid: PropTypes.string.isRequired,
      ask: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      create_date: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(SpendingTable);
