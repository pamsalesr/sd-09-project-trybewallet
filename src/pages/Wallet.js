import React from 'react';
import { connect } from 'react-redux';
import './Wallet.css';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <header>
        <div>TRYBE WALLET</div>
        <div>
          Email:
          <span className="span-header" data-testid="email-field">{ email }</span>
          <span className="span-header">Despesa total:</span>
          <span data-testid="total-field">{ total.toFixed(2) }</span>
          <span className="span-header" data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
