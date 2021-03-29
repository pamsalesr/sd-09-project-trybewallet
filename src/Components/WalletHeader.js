import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf } from 'prop-types';
import '../Styles/wallet.css';

class WalletHeader extends Component {
  render() {
    const { email, expenses } = this.props;
    let despesa = 0;
    if (expenses) {
      despesa = expenses.map((expense) => {
        const exchangeArray = Object.values(expense.exchangeRates);
        const coin = exchangeArray.find((obj) => obj.code === expense.currency);
        const totalExpense = parseFloat(expense.value * coin.ask);
        return totalExpense;
      });
    }
    const despesaTotal = despesa.reduce((acc, value) => (acc + value), 0);
    return (
      <div>
        <header className="header-wallet-container">
          <h1>TrybeWallet</h1>
          <div className="header-info-container">
            <div data-testid="email-field" className="header-email-user">
              E-mail:&nbsp;
              { email }
            </div>
            <p data-testid="total-field">
              Despesa total: R$&nbsp;
              { despesaTotal.toFixed(2) }
            </p>
            <p data-testid="header-currency-field">
              BRL
            </p>
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
