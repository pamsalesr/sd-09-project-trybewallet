import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.totalOfExpenses = this.totalOfExpenses.bind(this);
  }

  totalOfExpenses() {
    const { expenses } = this.props;
    let sumTotal = 0;
    expenses.forEach((expense) => {
      sumTotal += expense.value * expense.exchangeRates[expense.currency].ask;
    });
    return sumTotal;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1 data-testid="email-field">
          { ` Email: ${email} `}
        </h1>
        <h2 data-testid="total-field">
          { ` Despesa Total: ${this.totalOfExpenses().toFixed(2)} `}
        </h2>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.total,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
