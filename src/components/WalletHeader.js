import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  constructor() {
    super();
    this.updateTotalExpensesValue = this.updateTotalExpensesValue.bind(this);
  }

  updateTotalExpensesValue() {
    const { expenses } = this.props;
    let totalExpensesValue = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      totalExpensesValue += value * exchangeRates[currency].ask;
    });
    return totalExpensesValue;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">
          {`Olá ${userEmail}, seja bem-vindo(a)`}
        </h1>
        <h2 data-testid="total-field">
          Despesa total:
          {this.updateTotalExpensesValue().toFixed(2)}
          {/* Source https://github.com/tryber/sd-09-project-trybewallet/pull/52/files */}
        </h2>
        <h2 data-testid="header-currency-field">
          Câmbio: BRL
        </h2>
      </div>
    );
  }
}

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);
