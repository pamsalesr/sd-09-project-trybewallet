import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <header>
          <h1>Wallet</h1>
          <h4 data-testid="email-field">{user}</h4>
          <h4 data-testid="total-field">Despesa Total: 0</h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
