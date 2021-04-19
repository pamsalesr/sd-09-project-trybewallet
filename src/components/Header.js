import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, total, currency } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          Email:&nbsp;
          {email}
        </span>
        <span data-testid="total-field">
          Total:&nbsp;
          {total}
        </span>
        <span data-testid="header-currency-field">
          Moeda:&nbsp;
          {currency}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number,
  currency: PropTypes.string,
};

Header.defaultProps = {
  total: 0,
  currency: 'BRL',
};

export default connect(mapStateToProps)(Header);
