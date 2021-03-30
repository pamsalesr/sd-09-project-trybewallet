import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  sumExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, expense) => (
      acc + parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
    ), 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <Link to="/"><h3>Trybe-Wallet</h3></Link>
        <div className="account-container">
          <p data-testid="email-field">{ email }</p>
          <div>
            <p data-testid="total-field">{ this.sumExpenses() }</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
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
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
