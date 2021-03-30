import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderWallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <strong>Email:</strong>
          <span data-testid="email-field">{ email }</span>
          <strong>Despesa Total:</strong>
          <span data-testid="total-field">R$ 0,00</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderWallet);
