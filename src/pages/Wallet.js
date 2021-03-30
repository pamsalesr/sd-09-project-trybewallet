import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../Components/WalletHeader';

class Wallet extends React.Component {
  render() {
    const { savedEmail } = this.props;
    return (
      <div>
        <WalletHeader userData={ savedEmail } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedEmail: state.user.email,
});

Wallet.propTypes = {
  savedEmail: PropTypes.string,
};
Wallet.defaultProps = {
  savedEmail: '',
};

export default connect(mapStateToProps, null)(Wallet);
