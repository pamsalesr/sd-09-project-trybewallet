import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, totalSpend, currency } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ totalSpend }</p>
        <p data-testid="header-currency-field">{ currency }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalSpend: PropTypes.number,
  currency: PropTypes.string,
};

Header.defaultProps = {
  totalSpend: 0,
  currency: 'BRL',
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
