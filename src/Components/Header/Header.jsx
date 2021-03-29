import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { StyledHeader, CurrencySpan } from './style';

class Header extends Component {
  render() {
    const { email } = this.props;
    const total = 0;
    const currency = 'BRL';

    return (
      <StyledHeader>
        <div>TrybeWallet</div>
        <div>
          <p data-testid="email-field">{ `E-mail: ${email}` }</p>
          <p data-testid="total-field">
            { `Total expenses: ${total} ` }
            <CurrencySpan data-testid="header-currency-field">{ currency }</CurrencySpan>
          </p>
        </div>
      </StyledHeader>
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
