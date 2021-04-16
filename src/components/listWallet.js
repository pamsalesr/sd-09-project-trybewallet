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
    this.editExpense = this.editExpense.bind(this);
    this.saveExpenses = this.saveExpenses.bind(this);
  }

  saveExpenses(expenses) {
    const returnArray = [];
    console.log('=================== INICIO SAVEEXPENSES =======================');
    expenses.forEach((expense) => {
      console.log(expense.id);
      console.log(expense.description);
      console.log(expense.tag);
      console.log(expense.method);
      console.log(expense.value);
      console.log(expense.exchangeRates[expense.currency].name);
      console.log(expense.exchangeRates[expense.currency].ask);
      console.log(expense.exchangeRates[expense.currency].ask * expense.value);
      returnArray.push({
        id: expense.id,
        description: expense.description,
        tag: expense.tag,
        method: expense.method,
        value: expense.value,
        currencyName: expense.exchangeRates[expense.currency].name,
        exchange: expense.exchangeRates[expense.currency].ask,
        convertValue: expense.exchangeRates[expense.currency].ask * expense.value,
      });
    });
    console.log('=================== FINAL SAVEEXPENSES =======================');
    return returnArray;
  }

  editExpense(idToEdit) {
    const { editExpense } = this.props;
    editExpense(idToEdit, true);
  }

  deleteExpense(id) {
    const { addTotals, upgradeExpenses, wallet, totals } = this.props;
    const { currency } = totals;
    const { expenses } = wallet;
    const expensesTemp = expenses.filter((expense) => expense.id !== id);
    const total = expensesTemp.reduce((totalValue, expense) => {
      totalValue += expense.exchangeRates[expense.currency].ask * expense.value;
      return totalValue;
    }, 0);
    addTotals(total, currency);
    upgradeExpenses(expensesTemp);
  }

  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    expenses.forEach((expense) => console.log(
      expense.exchangeRates[expense.currency].name,
    ));
    console.log('=================== FINAL EXPENSE SEM MOFIFICACAO =================');
    const expensesTable = this.saveExpenses(expenses);
    return (
      <div>
        <p> </p>
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
                expensesTable.map((expense) => (
                  <WalletItem
                    description={ expense.description }
                    tag={ expense.tag }
                    method={ expense.method }
                    currency={ expense.currency }
                    value={ expense.value }
                    currencyName={ expense.currencyName }
                    exchange={ expense.exchange }
                    convertValue={ expense.convertValue }
                    deleteFunction={ () => this.deleteExpense(expense.id) }
                    editFunction={ () => this.editExpense(expense.id) }
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
  editExpense: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
    expenses: PropTypes.arrayOf(PropTypes.object),
    lastId: PropTypes.number,
    edit: PropTypes.number,
  }).isRequired,
  totals: PropTypes.shape({
    total: PropTypes.number,
    currency: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  upgradeExpenses: (expenses) => dispatch(Actions.upgradeExpenses(expenses)),
  addTotals: (total, currency) => dispatch(Actions.addTotals(total, currency)),
  editExpense: (idToEdit, editor) => dispatch(Actions.editExpense(idToEdit, editor)),
});

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, mapDispatchToProps)(ListWallet);

// console.log('========================== WALLET ========================');
// console.log(wallet);
// console.log('========================== EXPENSES ========================');
// console.log(expenses[0].exchangeRates);
// console.log(expenses.length && expenses.map((expense) => expense.exchangeRates[expense.currency].name));

//   description={ expense.description }
//   tag={ expense.tag }
//   method={ expense.method }
//   currency={ expense.currency }
//   value={ expense.value }
//   currencyName={ expense.exchangeRates[expense.currency].name }
//   exchange={ expense.exchangeRates[expense.currency].ask }
//   convertValue={ expense.exchangeRates[expense.currency].ask
//     * expense.value }
//   deleteFunction={ () => this.deleteExpense(expense.id) }
//   editFunction={ () => this.editExpense(expense.id) }
//   key={ expense.id }
// />
