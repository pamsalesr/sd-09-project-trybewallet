import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';

class Table extends Component {
  tables() {
    const { walletData } = this.props;
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
          {walletData.map((
            {
              id, currency, description, tag, method, value, exchangeRates },
          ) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{exchangeRates[currency].ask * value}</td>
              <td>Real</td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }

  render() {
    return (this.tables());
  }
}

const mapStateToProps = (state) => ({
  walletData: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

const { arrayOf } = propTypes;
Table.propTypes = {
  walletData: arrayOf(Object),
};

Table.defaultProps = {
  walletData: [],
};
