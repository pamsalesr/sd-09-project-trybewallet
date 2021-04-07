import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletItem from './walletItem';
import * as Actions from '../actions';
import './listWallet.css';

class ListWallet extends Component {
  constructor(props) {
    super(props);

    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(id, value) {
    const { addTotals, upgradeExpenses, wallet, totals } = this.props;
    const { total, currency } = totals;
    const { expenses } = wallet;
    addTotals(total - value, currency);
    upgradeExpenses(expenses.filter((expense) => expense.id !== id));
  }

  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;

    return (
      <div>
        <div>
          <p> </p>
        </div>
        <table border="0">
          <thead>
            <tr>
              <th className="description">Descrição</th>
              <th className="tag">Tag</th>
              <th className="method">Método de pagamento</th>
              <th className="value">Valor</th>
              <th className="currency">Moeda</th>
              <th className="exchange">Câmbio utilizado</th>
              <th className="convert-value">Valor convertido</th>
              <th className="convert-currency">Moeda de conversão</th>
              <th className="edit-exclude">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {
                expenses.map((expense) => (
                  <WalletItem
                    description={ expense.description }
                    tag={ expense.tag }
                    method={ expense.method }
                    currency={ expense.currency }
                    value={ expense.value }
                    currencyName={ expense.exchangeRates[expense.currency].name }
                    exchange={ expense.exchangeRates[expense.currency].ask }
                    convertValue={ expense.exchangeRates[expense.currency].ask
                      * expense.value }
                    deleteFunction={ () => this.deleteExpense(expense.id,
                      parseFloat(expense.value)
                       * parseFloat(expense.exchangeRates[expense.currency].ask)) }
                    key={ expense.id }
                  />
                ))
              }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ListWallet.propTypes = {
  addTotals: PropTypes.func.isRequired,
  upgradeExpenses: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
    expenses: PropTypes.arrayOf(PropTypes.object),
    lastId: PropTypes.number,
  }).isRequired,
  totals: PropTypes.shape({
    total: PropTypes.number,
    currency: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  upgradeExpenses: (expenses) => dispatch(Actions.upgradeExpenses(expenses)),
  addTotals: (total, currency) => dispatch(Actions.addTotals(total, currency)),
});

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, mapDispatchToProps)(ListWallet);
