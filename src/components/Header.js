import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <p>Este é o header</p>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">Total Gastos: 0</p>
        <p data-testid="header-currency-field">Cambio: BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
