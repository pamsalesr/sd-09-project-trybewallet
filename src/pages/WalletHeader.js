import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf } from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { email, expenses } = this.props;
    let _exprense = 0;
    if (expenses) {
      _exprense = expenses.map((expense) => {
        const exchangeArray = Object.values(expense.exchangeRates);
        const coin = exchangeArray.find((obj) => obj.code === expense.currency);
        const totalExpense = parseFloat(expense.value * coin.ask);
        return totalExpense;
      });
    }
    const totalyExpense = _exprense.reduce((acc, value) => (acc + value), 0);
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <div>
            <div data-testid="email-field">
              E-mail:
              { email }
            </div>
            <h2 data-testid="total-field">
              Despesa total: R$
              { totalyExpense.toFixed(2) }
            </h2>
            <h2 data-testid="header-currency-field">
              BRL
            </h2>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.propTypes = {
  email: string.isRequired,
  expenses: arrayOf().isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
