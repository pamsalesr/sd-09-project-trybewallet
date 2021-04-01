import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderWallet extends React.Component {
  sunTotal() {
    const { listExpenses } = this.props;
    return listExpenses
      .reduce((total, currentValue) => (
        total + Number(currentValue.value)
        * Number(currentValue.exchangeRates[currentValue.currency].ask)
      ), 0).toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <div className="header-wallet">
        <h1>Trybe Wallet</h1>
        <div className="div-email-total">
          <p>Email: </p>
          <p data-testid="email-field">{email}</p>
          <div className="div-total">
            <p className="element-total">Despesa Total R$</p>
            <p className="element-total" data-testid="total-field">
              { this.sunTotal() }
            </p>
            <p className="element-total" data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </div>
    );
  }
}

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  listExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  listExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(HeaderWallet);
