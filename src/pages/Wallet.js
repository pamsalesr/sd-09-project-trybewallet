import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <div>
          <img src="9814df697eaf49815d7df109110815ff887b3457.png" alt="trybe logo" />
          <div className="header">
            <h3 data-testid="email-field">
              Email:
              { email }
            </h3>
            <h3 data-testid="total-field">Despesa Total: 0</h3>
            <h3 data-testid="header-currency-field">BRL</h3>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
