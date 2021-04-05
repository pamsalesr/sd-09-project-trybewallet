import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.sumTotalValue = this.sumTotalValue.bind(this);
  }

  sumTotalValue() {
    const { expenses } = this.props;
    const totalCosts = expenses.reduce(
      (acc, expense) => {
        const { value, currency, exchangeRates } = expense;
        return acc + ((parseFloat(value)) * (parseFloat(exchangeRates[currency].ask)));
      }, 0,
    );
    return totalCosts.toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ userEmail }</span>
        <span data-testid="total-field">{ this.sumTotalValue() }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
