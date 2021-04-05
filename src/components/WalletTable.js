import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RemoveExpensesActions } from '../actions';

class WalletTable extends Component {
  constructor(props) {
    super(props);

    this.walletTable = this.walletTable.bind(this);
  }

  walletTable() {
    const { expenses, removeExpense } = this.props;
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
            const { id, description, tag, method, value, currency, exchangeRates } = item;

            return (
              <tr key={ index }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>
                  { Number(exchangeRates[currency].ask * Number(value)).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => removeExpense(id) }
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
  removeExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDsipatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(RemoveExpensesActions(id)),
});

export default connect(mapStateToProps, mapDsipatchToProps)(WalletTable);
