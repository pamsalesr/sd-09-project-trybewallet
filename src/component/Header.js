import React, { Component } from 'react';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          { email }
        </p>
        <span data-testid="total-field">0</span>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }
}

export default Header;

const { string } = propTypes;
Header.propTypes = {
  email: string,
};

Header.defaultProps = {
  email: '',
};
