import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      user.email
        ? (
          <header>
            <h1 data-testid="email-field">
              {`Bem-vindo ${user.email}`}
            </h1>

            <span
              data-testid="total-field"
              id="total-price"
            >
              0
            </span>

            <span
              data-testid="header-currency-field"
              id="currency-price"
            >
              {' BRL'}
            </span>
          </header>
        )
        : (
          <header>
            <h1>
              Login não efetuado!
            </h1>

            <span
              data-testid="total-field"
              id="total-price"
            >
              0
            </span>

            <span
              data-testid="header-currency-field"
              id="currency-price"
            >
              {' BRL'}
            </span>
          </header>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: PropTypes.shape({}),
};

export default connect(mapStateToProps)(Header);
