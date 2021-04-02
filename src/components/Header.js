import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { total: '' };
  // }

  render() {
    // const { total } = this.state;
    const { email, total } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          { `Hello user ${email}` }
        </p>
        <p data-testid="total-field">{total || 0 }</p>
        <p data-testid="header-currency-field">BRL in your account</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
