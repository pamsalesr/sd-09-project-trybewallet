import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './inputCurrency.css';

class InputCurrency extends Component {
  render() {
    const { fieldFunction, fieldValue, fieldDefault, fieldExchanges,
      currenciesApi, wallet } = this.props;
    const { currencies } = currenciesApi;
    const { editor } = wallet;
    let arrayTemp;

    if (editor) {
      arrayTemp = fieldExchanges;
    } else {
      arrayTemp = currencies;
    }
    delete arrayTemp.USDT;
    return (
      <div className="class-currency">
        <label htmlFor="form-currency">
          moeda&nbsp;&nbsp;
          <select
            data-testid="currency-input"
            id="form-currency"
            name="currency"
            type="text"
            value={ fieldValue }
            onChange={ fieldFunction }
            defaultValue={ fieldDefault }
          >
            <option data-testid="USD" value="USD" key="USD" id="USD">USD</option>
            <option data-testid="CAD" value="CAD" key="CAD" id="CAD">CAD</option>
            <option data-testid="EUR" value="EUR" key="EUR" id="EUR">EUR</option>
            <option data-testid="GBP" value="GBP" key="GBP" id="GBP">GBP</option>
            <option data-testid="ARS" value="ARS" key="ARS" id="ARS">ARS</option>
            <option data-testid="BTC" value="BTC" key="BTC" id="BTC">BTC</option>
            <option data-testid="LTC" value="LTC" key="LTC" id="LTC">LTC</option>
            <option data-testid="JPY" value="JPY" key="JPY" id="JPY">JPY</option>
            <option data-testid="CHF" value="CHF" key="CHF" id="CHF">CHF</option>
            <option data-testid="AUD" value="AUD" key="AUD" id="AUD">AUD</option>
            <option data-testid="CNY" value="CNY" key="CNY" id="CNY">CNY</option>
            <option data-testid="ILS" value="ILS" key="ILS" id="ILS">ILS</option>
            <option data-testid="ETH" value="ETH" key="ETH" id="ETH">ETH</option>
            <option data-testid="XRP" value="XRP" key="XRP" id="XRP">XRP</option>
          </select>
        </label>
      </div>
    );
  }
}

InputCurrency.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldFunction: PropTypes.func.isRequired,
  fieldDefault: PropTypes.string.isRequired,
  fieldExchanges: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  currenciesApi: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
  }).isRequired,
  wallet: PropTypes.shape({
    editor: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(InputCurrency);
