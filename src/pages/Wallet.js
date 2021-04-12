import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewInput from './NewInput';
import { deleteExpenseAction } from '../actions/index';

class Wallet extends React.Component {
  calculateTotalExpenses() {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    const convertedTotal = expenses.reduce((acc, curr) => {
      const expenseRate = curr.exchangeRates[curr.currency].ask;
      const convertedExpense = Number(expenseRate) * Number(curr.value);
      return acc + convertedExpense;
    }, 0);
    return convertedTotal.toFixed(2);
  }

  // deleteExpense({ target }) {
  //   console.log(target);
  // }

  renderTableButtons(item) {
    const { sendDeleteAction } = this.props;
    return (
      <div>
        <button type="button" data-testid="edit-btn">
          Editar despesa
        </button>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => sendDeleteAction(item.id) }
          // onClick={ () => console.log(item.id) }
        >
          Excluir
        </button>
      </div>
    );
  }

  renderExpensesTable() {
    const { expenses } = this.props;
    return !expenses ? <h1>Não há despesas cadastradas</h1> : (
      <table>
        <thead className="table-head">
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

        {/* <tbody> */}
        { expenses.map((item) => {
          const { id, description, tag, method, currency, value, exchangeRates } = item;
          const currenciesArray = Object.entries(exchangeRates);
          const usedCurrency = currenciesArray.find((curr) => curr[0] === currency);
          // const usedCurrencyExchange = (usedCurrency[1].ask).toFixed(2);
          // console.log(usedCurrency);
          return (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ usedCurrency[1].name }</td>
              <td>{ (1 * usedCurrency[1].ask).toFixed(2) }</td>
              <td>{ (item.value * usedCurrency[1].ask).toFixed(2) }</td>
              <td>Real</td>
              <td>{ this.renderTableButtons(item) }</td>
            </tr>
          );
        })}
        {/* </tbody> */}
      </table>
    );
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <NewInput />
        <header>
          <span data-testid="email-field">{ email }</span>
          <span
            data-testid="total-field"
          >
            Total gasto: R$
            { this.calculateTotalExpenses() }
          </span>
          <span data-testid="header-currency-field"> BRL</span>
        </header>
        <main className="table">
          { this.renderExpensesTable() }
        </main>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendDeleteAction: (id) => dispatch(deleteExpenseAction(id)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendDeleteAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
