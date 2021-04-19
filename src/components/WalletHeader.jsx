import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="total-field">
          Despesa total: 0
        </div>
        <div data-testid="header-currency-field">
          Moeda: BRL
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

WalletHeader.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(WalletHeader);
