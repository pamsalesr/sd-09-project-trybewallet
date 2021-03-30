import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { emailInfo } = this.props;
    return (
      <header>
        TrybeWallet teste
        <p>{ emailInfo }</p>
      </header>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   teste: dispatch('teste'),
// });

Wallet.propTypes = {
  emailInfo: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailInfo: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
