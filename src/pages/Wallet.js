import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header className="header-wallet">
        <h1 data-testid="email-field">{`Email: ${email}`}</h1>
        <div>
          <h1 data-testid="total-field">Total de despesas: R$0 </h1>
          <h1 data-testid="header-currency-field">BRL</h1>
        </div>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
