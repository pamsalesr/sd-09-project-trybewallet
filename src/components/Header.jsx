import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.totalExpenseUpdate = this.totalExpenseUpdate.bind(this);
  }

  totalExpenseUpdate() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((element) => {
      total += element.value * element.exchangeRates[element.currency].ask;
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <span>Despesas Total </span>
        <span data-testid="total-field">{this.totalExpenseUpdate()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf('').isRequired,
};

export default connect(mapStateToProps)(Header);
