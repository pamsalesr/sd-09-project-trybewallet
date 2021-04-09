import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderWallet extends React.Component {
  constructor() {
    super();

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((element) => {
      sum += element.value * element.exchangeRates[element.currency].ask;
    });
    return sum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <strong>Email:</strong>
          <span data-testid="email-field">{ email }</span>
          <strong>Despesa Total:</strong>
          <span data-testid="total-field">{this.sumExpenses()}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};
HeaderWallet.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(HeaderWallet);
