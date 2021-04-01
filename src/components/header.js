import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.updateTotal = this.updateTotal.bind(this);
  }

  updateTotal() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      const { exchangeRates, value, currency } = expense;
      total += value * exchangeRates[currency].ask;
    });
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <img src="9814df697eaf49815d7df109110815ff887b3457.png" alt="trybe logo" />
        <div className="header">
          <h3 data-testid="email-field">
            Email:
            { email }
          </h3>
          <h3 data-testid="total-field">
            Despesa Total:
            { this.updateTotal().toFixed(2) }
          </h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.total,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
