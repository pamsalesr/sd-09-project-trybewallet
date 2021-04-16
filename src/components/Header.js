import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((expenseValue) => {
      sum += expenseValue.value * expenseValue.exchangeRates[expenseValue.currency].ask;
    });
    return sum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <div className="right">
          <p data-testid="email-field">
            { `Bem Vindo ${email}` }
          </p>
          <p
            data-testid="total-field"
          >
            { `Total of Expenses $${this.totalExpenses()} `}
          </p>
          <p data-testid="header-currency-field">Currency converted to BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
