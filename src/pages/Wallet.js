import { connect } from 'react-redux';
import React from 'react';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    console.log(email);
    return <div>TrybeWallet</div>;
  }
}

const mapStateToprops = (state) => ({
  email: state,
});

export default connect(mapStateToprops)(Wallet);

const { string } = propTypes;
Wallet.propTypes = {
  email: string,
};

Wallet.defaultProps = {
  email: '',
};
