import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderWallet extends React.Component {
  constructor(props) {
    super(props);
    this.sumExpensesValues = this.sumExpensesValues.bind(this);
  }

  sumExpensesValues() {
    const { expenses } = this.props;
    let counter = 0;
    expenses.forEach(({ value, exchangeRates, currency}) => {
      counter += (value * exchangeRates[currency].ask);
    });
    return parseFloat(counter).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.sumExpensesValues() }</p>
        <p data-testid="header-currency-field">BRL</p>
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
};

export default connect(mapStateToProps)(HeaderWallet);
