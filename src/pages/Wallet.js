import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../pageStyle/headerWallet.css';
import FormWallet from './FormWallet';

class Wallet extends React.Component {
  render() {
    const { email, valueNum } = this.props;
    const newResult = valueNum.reduce((acc, curVal) => {
      const askValue = curVal.exchangeRates[`${curVal.currency}`].ask;
      return parseFloat(acc) + (parseFloat(curVal.value) * askValue);
    }, 0);

    return (
      <div>
        <header className="header-wallet">
          <p className="email-field" data-testid="email-field">{`Email: ${email}`}</p>
          <div className="total-price">
            <p data-testid="total-field">
              {`Total de despesas: R$${newResult.toFixed(2)}`}
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
  valueNum: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  valueNum: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
