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

  handleClick(addExpense, currentExpense) {
    addExpense(currentExpense);

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
    const { currencies, currentExpense } = this.state;
    const { currency, description, method, tag, value } = currentExpense;
    const { email, addExpense } = this.props;

    return (
      <div>
        <header>
          <Header email={ email } />
        </header>
        <main>
          <section>
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
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
