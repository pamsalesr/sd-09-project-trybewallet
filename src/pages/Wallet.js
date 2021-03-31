import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className="general">
        <header>
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">
            Email:
            { user.email }
          </span>
          <span data-testid="total-field">Total: 0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}
Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user });
export default connect(mapStateToProps, null)(Wallet);
