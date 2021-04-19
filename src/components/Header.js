import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    // let total = 0;
    const { email, total } = this.props;

    // if (expenses.length > 0) {
    //  expenses.forEach((expense) => {
    //    const { currency } = expense;
    //    const value = parseFloat(expense.value);
    //    const valueCurrency = (parseFloat(expense.exchangeRate[currency].ask));
    //    const valueConvert = value * valueCurrency;
    //    total += (parseFloat(valueConvert));
    //  });
    // }

    return (
      <header>
        <div>HEADER LOGO</div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{total > 0 ? total.toFixed(2) : 0}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
