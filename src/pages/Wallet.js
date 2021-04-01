import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Inputs from '../components/Inputs';
import { getUpdatedCurrenciesThunk } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expensesSum: 0,
      currencies: [],
      currentExpense: {
        id: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        value: 0,
        description: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      .map((expense) => {
        const currentCurrency = expense.currency;
        const currentExchangeRate = Object.entries(expense.exchangeRates)
          .find((currency) => currency[0] === currentCurrency)[1].bid;

        const valueToBRL = (parseInt(expense.value, 10) * currentExchangeRate);

        return parseFloat(valueToBRL.toFixed(2));
      })
      .reduce((acc, current) => acc + current, 0);

    this.setState({
      expensesSum,
    });
  }

  handleClick(currentExpense, getUpdatedCurrencies) {
    getUpdatedCurrencies(currentExpense);

    const interval = 5000;
    setTimeout(() => {
      this.sumExpenses();
    }, interval);

    // this.sumExpenses();
    this.setState((previousState) => ({
      currentExpense: {
        id: previousState.currentExpense.id + 1,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        value: 0,
        description: '',
      },
    }));
  }

  render() {
    const { currencies, currentExpense, expensesSum } = this.state;
    const { currency, description, method, tag, value } = currentExpense;
    const { email, getUpdatedCurrencies } = this.props;

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
              handleClick={ () => this.handleClick(
                currentExpense,
                getUpdatedCurrencies,
              ) }
              currency={ currency }
              description={ description }
              method={ method }
              tag={ tag }
              value={ value }
            />
          </section>
          <section id="table-section">
            <Table />
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
  getUpdatedCurrencies: (expense) => dispatch(getUpdatedCurrenciesThunk(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
