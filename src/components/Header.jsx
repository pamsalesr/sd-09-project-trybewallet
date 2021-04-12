import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenses() {
    const { walletExpenses } = this.props;
    // logica de soma de todas as despesas
    return walletExpenses || 0;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <h2>TrybeWallet</h2>
        <span data-testid="email-field">{ userEmail }</span>
        <span data-testid="total-field">{ this.totalExpenses().toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  walletExpenses: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string,
  walletExpenses: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
