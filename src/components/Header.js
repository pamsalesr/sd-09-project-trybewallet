import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/components/Header.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header-container">
        <h1>Personal Wallet</h1>
        <div>
          <p data-testid="email-field">
            <span className="label">Usuário: </span>
            { email }
          </p>
          <p>
            <span className="label">Despesa Total: </span>
            <span>R$ </span>
            <span data-testid="total-field">
              { expenses
                .reduce(((total, expense) => {
                  total += (expense.value * expense.exchangeRates[expense.currency].ask);
                  return total;
                }), 0).toFixed(2) }
            </span>
            <span data-testid="header-currency-field"> BRL</span>
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
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
