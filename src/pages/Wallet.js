import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpense from './AddExpense';
import { fetchCurrencies, createExpense } from '../actions';
import ShowExpenses from './ShowExpenses';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeRates: {},
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expense: {},
      expenses: [],
    };
    this.handleInputEvents = this.handleInputEvents.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.createLocalExpense = this.createLocalExpense.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  createLocalExpense() {
    const { value, description, currency, method, tag } = this.state;
    const { wallet } = this.props;
    const { currencies } = wallet;
    const exchangeRates = currencies[0];
    const { expenses } = wallet;
    const id = expenses.length;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    this.setState({ expense });
  }

  handleInputEvents({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (!(this.state) || Object.keys(this.state).length >= 1) {
        this.createLocalExpense();
      }
    });
  }

  saveExpense() {
    const { newExpenseDispatch, getCurrencies } = this.props;
    getCurrencies();
    const { expense } = this.state;
    const form = document.getElementById('add-expense');
    newExpenseDispatch(expense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expense: {},
    });
    form.reset();
  }

  render() {
    const { user, wallet } = this.props;
    const { expenses } = wallet;
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      const exchangeRates = Object.values(expense.exchangeRates);
      const currentAsk = exchangeRates.find((rate) => rate.code === expense.currency).ask;
      const totalExpense = (parseFloat(expense.value) * parseFloat(currentAsk));
      totalExpenses += totalExpense;
    });
    return ((
      <section className="general">
        <header>
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">
            Email:
            { user.email }
          </span>
          <span data-testid="total-field">
            Total:
            { totalExpenses.toFixed(2) || 0}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        {
          wallet.isFetching
            ? <div><h2 className="secondary-heading">Loading...</h2></div>
            : (
              <section className="data">
                <AddExpense
                  onChange={ this.handleInputEvents }
                  onClick={ this.saveExpense }
                />
              </section>
            )
        }
        <ShowExpenses />
      </section>
    )
    );
  }
}
Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  newExpenseDispatch: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    isFetching: PropTypes.bool,
    currencies: PropTypes.shape(),
    expenses: PropTypes.shape().isRequired,
    totalExpense: PropTypes.number.isRequired,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  newExpenseDispatch: (expense) => dispatch(createExpense(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
