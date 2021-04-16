import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletThunk } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { apiCurrencies } = this.props;
    apiCurrencies();
  }

  getTotal() {
    const { expenses } = this.props;
    return expenses.map(({ currency, value, exchangeRates }) => {
      const currencyData = exchangeRates[currency];
      const total = Number(value) * Number(currencyData.ask);
      return total;
    })
      .reduce((acc, expense) => acc + expense, 0);
  }

  /* getTotal() {
    const { expenses } = this.props;
    let sum = expenses.reduce((acc, curr) => {
      const convertedPrice = curr.value * curr.exchangeRates[curr.currency].ask;
      acc += convertedPrice;
      return acc;
    }, 0);
    sum = Math.floor(sum * 100) / 100;
    return sum;
  } */

  render() {
    const { email } = this.props;
    // const INITIAL_VALUE = 0;
    // console.log(this.getTotal());
    return (
      <div>
        <p data-testid="email-field">
          Email:
          { ' ' }
          { email }
        </p>
        <p data-testid="total-field">
          Despesa total:
          { ' ' }
          { Math.round(this.getTotal() * 100) / 100 }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  apiCurrencies: () => dispatch(walletThunk()),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  apiCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
