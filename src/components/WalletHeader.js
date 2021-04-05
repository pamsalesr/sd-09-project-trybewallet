import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logoTrybe from '../logoTrybe.png';

class WalletHeader extends Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <Link to="/">
          <img src={ logoTrybe } alt="Logo da Trybe" />
        </Link>

        <span>E-mail:</span>
        <span data-testid="email-field">{ email }</span>

        <span>Despesa total:</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(WalletHeader);
