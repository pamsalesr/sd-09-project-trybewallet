import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.css';

class Header extends React.Component {
  render() {
    let totalExpenses = 0;
    const { email, expenses } = this.props;
    totalExpenses = expenses.reduce((acc, coin) => (
      parseFloat(acc)
      + (parseFloat(coin.exchangeRates[coin.currency].ask)
      * parseFloat(coin.value))), 0)
      .toFixed(2);

    return (
      <header className="header">
        <div className="header-title">
          <h2>TrybeWallet</h2>
        </div>
        <div className="container-head">
          <div>
            <p data-testid="email-field">{email}</p>
          </div>
          <div>
            <p>
              Despesa total:
              R$
              <span data-testid="total-field">{totalExpenses}</span>
            </p>
          </div>
          <div>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.object,
}.isRequired;

const mapStateToProps = ({ user, wallet: { expenses } }) => ({
  email: user.email,
  expenses,
});

export default connect(mapStateToProps, null)(Header);
