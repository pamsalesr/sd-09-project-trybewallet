import React, { Component } from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
// import { StyledHeader, CurrencySpan } from './style';

class Header extends Component {
  constructor(props) {
    super(props);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses(expenses) {
    return expenses.reduce((acc, { value, currency, exchangeRates }) => {
      let convertedValue = value;
      if (currency !== 'BRL') {
        convertedValue = value * exchangeRates[currency].ask;
        convertedValue = Math.round(convertedValue * 100) / 100;
      }
      return acc + convertedValue;
    }, 0);
  }

  render() {
    const { email, expenses } = this.props;
    const CURRENCY = 'BRL';

    return (
      <header>
        <div>TrybeWallet</div>
        <div>
          <p data-testid="email-field">{ `E-mail: ${email}` }</p>
          <p data-testid="total-field">
            { `Total das despesas: ${this.sumExpenses(expenses)} ` }
            <span data-testid="header-currency-field">{ CURRENCY }</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string.isRequired,
  expenses: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
