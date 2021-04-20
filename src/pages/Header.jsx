import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => (
      acc + (curr.value * curr.exchangeRates[curr.currency].ask)
    ), 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h4 data-testid="email-field">{ email }</h4>
        <div className="totalExpensesBRL">
          <h3 data-testid="total-field">{ this.totalExpenses() }</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
