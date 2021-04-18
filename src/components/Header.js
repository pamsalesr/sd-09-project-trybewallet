import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { total, currency } = this.state;
    const { email } = this.props;
    return (
      <header>
        <h1>
          HEADER LOGO
        </h1>
        <span data-testid="email-field">
          { `Email: ${email}` }
        </span>
        <span data-testid="total-field">
          { `Despesa Total: R$ ${total}` }
        </span>
        <span data-testid="header-currency-field">{ currency }</span>
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
