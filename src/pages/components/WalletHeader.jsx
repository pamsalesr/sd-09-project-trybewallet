import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <div className="header-title">TrybeWallet</div>
        <div className="container">
          <div
            className="user-email"
            data-testid="email-field"
          >
            {email}
          </div>
          <div className="value-container">
            <div
              className="total-expense"
              data-testid="total-field"
            >
              {total || 0}
            </div>
            <div
              className="wallet-currency"
              data-testid="header-currency-field"
            >
              BRL
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expensesTotal,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number,
};

WalletHeader.defaultProps = {
  total: 0,
};

export default connect(mapStateToProps)(WalletHeader);
