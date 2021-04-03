import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h4 data-testid="email-field">{ email }</h4>
        <h3 data-testid="total-field">0</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
