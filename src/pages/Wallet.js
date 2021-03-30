import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../pageStyle/headerWallet.css';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header className="header-wallet">
        <p className="email-field" data-testid="email-field">{`Email: ${email}`}</p>
        <div className="total-price">
          <p data-testid="total-field">Total de despesas: R$0 </p>
          <p data-testid="header-currency-field">BRL</p>
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
