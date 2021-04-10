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
    const total = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      return acc + ((parseFloat(value)) * (parseFloat(exchangeRates[currency].ask)));
    }, 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <strong>Email:</strong>
          <span data-testid="email-field">{ email }</span>
          <strong>Despesa Total:</strong>
          <span data-testid="total-field">{`R$ ${this.sumExpenses()}`}</span>
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
