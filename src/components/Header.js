import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let totalExpenses = 0;
    if (expenses.length > 0) {
      totalExpenses = expenses
        .reduce((acc, curr) => (acc
          + (Number(curr.value)
          * Number(curr.exchangeRates[curr.currency].ask))), 0).toFixed(2);
    }
    return (
      <div>
        <h5 data-testid="email-field">{ email }</h5>
        <h5>
          Despesas:
          <p data-testid="total-field">
            { totalExpenses }
          </p>
        </h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequered;

export default connect(mapStateToProps)(Header);
