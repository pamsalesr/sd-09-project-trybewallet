import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalExpenses: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { totalExpenses, currency } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          { userEmail }
        </p>
        <p data-testid="total-field">
          Despesa Total:
          { totalExpenses }
        </p>
        <p data-testid="header-currency-field">
          Câmbio utilizado:
          { currency }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);
