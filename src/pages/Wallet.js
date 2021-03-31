import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PropTypes from 'prop-types';
import InputsFields from '../components/inputsField';

class Wallet extends React.Component {

  totalCost() {
    const { expenses } = this.props;

    const total = expenses.reduce((totalSum, expenseInfos) => {
      const { value, currency, exchangeRates } = expenseInfos;
      const currencyValue = Number(exchangeRates[currency].ask);
      return totalSum + (value * currencyValue);
    }, 0);
    return total.toFixed(2);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            usuario:
            {user}
          </span>
          <div>
            <span data-testid="total-field">
              {this.totalCost()}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <InputsFields />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({

// });

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
