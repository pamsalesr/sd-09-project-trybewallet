import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  constructor(props) {
    super(props);

    this.renderConvertedValue = this.renderConvertedValue.bind(this);
  }

  renderConvertedValue() {
    const { currencies, expenses } = this.props;
    const data = Object.entries(currencies);
    let convertedValue = 0;
    if (expenses) {
      expenses.forEach((expense) => {
        data.forEach((currency) => {
          if (expense.currency === currency[0]) {
            convertedValue += (expense.value * currency[1].ask);
          }
        });
      });
    }
    return convertedValue.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>TRYBE</h1>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">{ this.renderConvertedValue() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(WalletHeader);
