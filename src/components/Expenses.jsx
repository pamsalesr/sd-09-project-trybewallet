import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import walletAction from '../actions/walletAction';

class RenderExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.convertValue = this.convertValue.bind(this);
    this.findExchange = this.findExchange.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.state = {
      loading: false,
    };
  }

  convertValue(expense) {
    return (parseFloat(expense.value) * this.findExchange(expense).ask);
  }

  findExchange(expense) {
    const rates = Object.entries(expense.exchangeRates);
    const foundRate = rates.find((rate) => rate[1].code === expense.currency)[1];
    return foundRate;
  }

  async deleteExpense(id, currencies) {
    this.setState({ loading: true });
    const { expenses, newExpenses } = this.props;
    expenses.splice(id, 1);
    const wallet = { currencies, expenses };
    await newExpenses(wallet);
    this.setState({ loading: false });
  }

  render() {
    const { expenses, currencies } = this.props;
    const { loading } = this.state;
    return (
      <table className="App table">
        <thead className="App App-header-color">
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
          { expenses.length === 0 ? null : expenses.map((expense) => (
            <tr key={ expense.id } id={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{`${expense.value}`}</td>
              <td>{this.findExchange(expense).name}</td>
              <td>{Math.round(this.findExchange(expense).ask * 100) / 100}</td>
              <td>{Math.round(this.convertValue(expense) * 100) / 100}</td>
              <td>Real</td>
              <td>
                <button type="button" className="btn edit">
                  <span role="img" aria-label="escrever">📝</span>
                </button>
                <button
                  id={ expense.id }
                  type="button"
                  className="btn delete"
                  data-testid="delete-btn"
                  onClick={ ({ target }) => this.deleteExpense(target.id, currencies) }
                >
                  <span role="img" aria-label="lixo">🗑️</span>
                </button>
              </td>
              { loading ? <td>Loading...</td> : null }
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

RenderExpenses.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  newExpenses: PropTypes.func.isRequired,
};

const getState = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const dispatchExpense = (dispatch) => ({
  newExpenses: (expenses) => dispatch(walletAction(expenses)),
});

export default connect(getState, dispatchExpense)(RenderExpenses);
