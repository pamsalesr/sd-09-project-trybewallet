import React from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userEmail, expenses } = this.props;
    let totalExpense = 0;
    // baseado na resolução do saulokirchmaier
    if (expenses.length > 0) {
      totalExpense = expenses.reduce((acc, expense) => (acc + Number(expense.value)
          * Number(expense.exchangeRates[expense.currency].ask)), 0).toFixed(2);
    }

    return (
      <header className="header">
        <p data-testid="header-currency-field">
          BRL
        </p>
        <p data-testid="total-field">
          {`Total: R$ ${totalExpense || 0}`}
        </p>
        <p data-testid="email-field">
          {userEmail}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string,
  totalExpenseProp: PropTypes.number,
  expenses: PropTypes.arrayOf(object),
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  // totalExpenseProp: state.wallet.totalExpense,
});

export default connect(mapStateToProps)(Header);
