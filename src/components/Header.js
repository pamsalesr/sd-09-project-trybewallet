import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    const INITIAL_VALUE = 0;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          { ' ' }
          { email }
        </p>
        <p data-testid="total-field">
          Despesa total:
          { ' ' }
          { INITIAL_VALUE }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
