import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../pageStyle/headerWallet.css';
import FormWallet from './FormWallet';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header className="header-wallet">
          <p className="email-field" data-testid="email-field">{`Email: ${email}`}</p>
          <div className="total-price">
            <p data-testid="total-field">
              Total de despesas: R$0
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <FormWallet />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  // valueNum: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
