import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import Forms from '../componets/formWalet';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h6 data-testid="email-field">{email}</h6>
          <p data-testid="total-field">Dispesa total: R$ 0,00</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <Forms />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropsTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
