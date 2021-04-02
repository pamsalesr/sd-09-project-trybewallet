import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { deleteTableLineAction } from '../actions';

class Table extends Component {
  deleteData(value) {
    const { deleteTable } = this.props;
    deleteTable(value);
  }

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
              id, currency, description, tag, method, value, exchangeRates }, index,
          ) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{Number(exchangeRates[currency].ask * value).toFixed(2)}</td>
              <td>Real</td>
              <td><button data-testid="edit-btn" type="button">Edit</button></td>
              <td>
                <button
                  onClick={ () => { this.deleteData(index); } }
                  data-testid="delete-btn"
                  type="button"
                >
                  X
                </button>

              </td>
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

const mapDispatchToProps = (dispatch) => ({
  deleteTable: (index) => dispatch(deleteTableLineAction(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

const { arrayOf, func } = propTypes;
Table.propTypes = {
  walletData: arrayOf(Object),
  deleteTable: func,
};

Table.defaultProps = {
  walletData: [],
  deleteTable: () => {},
};
