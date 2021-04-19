import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  calcTotal() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, element) => {
      const convertedValue = (
        Math.round(
          element.value * element.exchangeRates[element.currency].ask * 100,
        ) / 100
      ).toFixed(2);
      const partialTotal = (
        Math.round((Number(acc) + Number(convertedValue)) * 100) / 100
      ).toFixed(2);
      return partialTotal;
    }, 0);
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          Email:&nbsp;
          {email}
        </span>
        <span data-testid="total-field">
          Total:&nbsp;
          {this.calcTotal()}
        </span>
        <span data-testid="header-currency-field">Moeda:&nbsp; BRL</span>
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
