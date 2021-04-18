import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="header-component">
        TrybeWallet
        <div className="header-info">
          <div className="header-email">
            E-mail:
            <span data-testid="email-field">{ email }</span>
          </div>
          <div className="header-currency">
            Despesa total: R$
            <span data-testid="total-field"> 0</span>
            <span data-testid="header-currency-field"> BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
