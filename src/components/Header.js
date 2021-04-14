import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span>R$ </span>
        <span data-testid="total-field">
          {
            expenses.reduce(((total, expense) => {
              total += (expense.value * expense.exchangeRates[expense.currency].ask);
              return total;
            }), 0).toFixed(2)
          }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequered;

export default connect(mapStateToProps)(Header);
