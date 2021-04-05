import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      // totalExpenses: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { emailInfo, totalExpensesState } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <header>
          <p>TrybeWallet</p>
          <span data-testid="email-field">{ emailInfo }</span>
          <span data-testid="total-field">{totalExpensesState || 0}</span>
          <span data-testid="header-currency-field">{currency}</span>
        </header>
        <ExpensesForm />
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   teste: dispatch('teste'),
// });

Wallet.propTypes = {
  emailInfo: PropTypes.string.isRequired,
  totalExpensesState: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  emailInfo: state.user.email,
  totalExpensesState: state.wallet.totalExpenses,
});

export default connect(mapStateToProps, null)(Wallet);
