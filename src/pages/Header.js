import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Requisito resolvido com auxílio de revisão de colegas.

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((currentValue) => {
      const { exchangeRates, value, currency } = currentValue;
      total += value * exchangeRates[currency].ask;
    });
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <span>Email: </span>
        <span data-testid="email-field">{ email }</span>
        <br />
        <span>Despesa Total: </span>
        <span data-testid="total-field">{ this.sumExpenses().toFixed(2) || 0 }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>);
  }
}

const mapStatetoProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStatetoProps)(Header);
