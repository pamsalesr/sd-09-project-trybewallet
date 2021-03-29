import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h5 data-testid="email-field">{ email }</h5>
        <h5 data-testid="total-field">{ `Despesas: ${0}` }</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequered;

export default connect(mapStateToProps)(Header);
