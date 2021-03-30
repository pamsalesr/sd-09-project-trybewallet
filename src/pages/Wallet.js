import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { walletEmail } = this.props;
    const expenditure = 0;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ walletEmail }</span>
          <span data-testid="total-field">{ expenditure }</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  walletEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  walletEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
