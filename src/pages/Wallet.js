import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import AddSpending from '../components/AddSpending';

class Wallet extends React.Component {
  render() {
    const { email, passwordMD5 } = this.props;
    return ((email && passwordMD5) ? (
      <>
        <Header />
        <AddSpending />
      </>
    ) : <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  passwordMD5: state.user.passwordMD5,
});

Wallet.propTypes = {
  email: PropTypes.string,
  passwordMD5: PropTypes.string,
};

Wallet.defaultProps = {
  email: null,
  passwordMD5: null,
};

export default connect(mapStateToProps)(Wallet);
