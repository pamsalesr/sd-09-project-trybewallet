import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletTable extends Component {
  constructor(props) {
    super(props);

    this.walletTable = this.walletTable.bind(this);
  }

  walletTable() {
    const { expenses } = this.props;
    const tbHead = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir'];

    return (
      <table>
        <thead>
          <tr>
            {tbHead.map((item, index) => (
              <th key={ index }>
                { item }
              </th>))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((item, index) => {
            const { description, tag, method, value, currency, exchangeRates } = item;
            const { ask } = exchangeRates[currency];
            return (
              <tr key={ index }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ Number(ask).toFixed(2) }</td>
                <td>{ Number(ask * Number(value)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => {} }
                  >
                    D
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <>
        { this.walletTable() }
      </>
    );
  }
}

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(WalletTable);
