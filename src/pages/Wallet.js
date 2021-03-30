import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <>
        <header>
          <div>TrybeWallet</div>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">{ 0 }</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <div>a</div>
      </>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({ email });

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
};

Wallet.defaultProps = {
  email: 'Não identificado',
};
