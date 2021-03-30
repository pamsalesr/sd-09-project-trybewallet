import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <h1 data-testid="email-field">
          { ` Email: ${email} `}
        </h1>
        <h2 data-testid="total-field">
          { ` Total: ${total || 0} `}
        </h2>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
