import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
// import { StyledHeader, CurrencySpan } from './style';

class Header extends Component {
  render() {
    const { email } = this.props;
    const total = 0;
    const currency = 'BRL';

    return (
      <header>
        <div>TrybeWallet</div>
        <div>
          <p data-testid="email-field">{ `E-mail: ${email}` }</p>
          <p data-testid="total-field">
            { `Total expenses: ${total} ` }
            <span data-testid="header-currency-field">{ currency }</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: string.isRequired,
};

export default connect(mapStateToProps)(Header);
