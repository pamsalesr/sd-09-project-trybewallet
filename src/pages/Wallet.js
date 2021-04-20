import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header className="wallet-header">
          <span data-testid="email-field"><strong>{ userEmail }</strong></span>
          <span data-testid="total-field">R$0.00</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <ExpensesForm />
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
