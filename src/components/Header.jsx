import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // state = {  }
  render() {
    const { email } = this.props;
    console.log(email);
    return (
      <div>
        <h4 data-testid="email-field">{ email }</h4>
        <h5 data-testid="total-field">0</h5>
        <h6 data-testid="header-currency-field">BRL</h6>
      </div>
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
