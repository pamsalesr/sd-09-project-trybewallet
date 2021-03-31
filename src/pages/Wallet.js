import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PropTypes from 'prop-types';
import InputsFields from '../components/inputsField';
import Table from '../components/Table';

class Wallet extends React.Component {
  sumExpenses() {
    const { expenses } = this.props;
    const sum = expenses.reduce((total, curr) => {
      const value = Number(curr.exchangeRates[curr.currency].ask * curr.value);
      total = value + total;
      return total;
    }, 0).toFixed(2);
    return sum;
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
              {this.sumExpenses()}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <InputsFields />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  user: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Wallet);
