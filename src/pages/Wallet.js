import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Inputs from '../components/Inputs';
import { addExpenseAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expensesSum: 0,
      currencies: [],
      currentExpense: {
        currency: 'USD',
        method: 'money',
        tag: 'food',
        value: 0,
        description: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidMount() {
    this.sendCurrenciesKeysToState();
  }

  async fetchCurrencies() {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();

    return response;
  }

  async sendCurrenciesKeysToState() {
    const currencies = await this.fetchCurrencies();
    const currenciesKeys = Object.keys(currencies);
    const indexOfUSTD = currenciesKeys.indexOf('USDT');

    this.setState({
      currencies: [
        ...currenciesKeys.slice(0, indexOfUSTD),
        ...currenciesKeys.slice(indexOfUSTD + 1, currencies.length),
      ],
    });
  }

  handleChange({ target }) {
    const { currentExpense } = this.state;

    this.setState({
      currentExpense: {
        ...currentExpense,
        [target.name]: target.value,
      },
    });
  }

  sumExpenses() {
    const { expenses } = this.props;

    const expensesSum = expenses
      .map(({ value }) => parseInt(value, 10))
      .reduce((acc, current) => acc + current, 0);

    this.setState({
      expensesSum,
    });
  }

  handleClick(addExpense, currentExpense) {
    const interval = 5000;

    addExpense(currentExpense);

    setTimeout(() => {
      this.sumExpenses();
    }, interval);

    this.setState({
      currentExpense: {
        currency: 'USD',
        method: 'money',
        tag: 'food',
        value: 0,
        description: '',
      },
    });
  }

  render() {
    const { currencies, currentExpense, expensesSum } = this.state;
    const { currency, description, method, tag, value } = currentExpense;
    const { email, addExpense } = this.props;

    return (
      <div>
        <header>
          <Header email={ email } expensesSum={ expensesSum } />
        </header>
        <main>
          <section id="inputs-section">
            <Inputs
              handleChange={ this.handleChange }
              currencies={ currencies }
              handleClick={ () => this.handleClick(addExpense, currentExpense) }
              currency={ currency }
              description={ description }
              method={ method }
              tag={ tag }
              value={ value }
            />
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  addExpense: PropTypes.func,
  expenses: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
