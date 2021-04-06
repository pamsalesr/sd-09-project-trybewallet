import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputCurrency extends Component {
  render() {
    const { fieldFunction, fieldValue } = this.props;
    return (
      <div className="class-currency">
        <label htmlFor="form-currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="form-description"
            type="text"
            value={ fieldValue }
            onChange={ fieldFunction }
          >
            {/* <option data-testid="BRL" value="BRL" id="BRL">BRL</option> */}
            <option data-testid="USD" value="USD" id="USD">USD</option>
            <option data-testid="CAD" value="CAD" id="CAD">CAD</option>
            <option data-testid="EUR" value="EUR" id="EUR">EUR</option>
            <option data-testid="GBP" value="GBP" id="GBP">GBP</option>
            <option data-testid="ARS" value="ARS" id="ARS">ARS</option>
            <option data-testid="BTC" value="BTC" id="BTC">BTC</option>
            <option data-testid="LTC" value="LTC" id="LTC">LTC</option>
            <option data-testid="JPY" value="JPY" id="JPY">JPY</option>
            <option data-testid="CHF" value="CHF" id="CHF">CHF</option>
            <option data-testid="AUD" value="AUD" id="AUD">AUD</option>
            <option data-testid="CNY" value="CNY" id="CNY">CNY</option>
            <option data-testid="ILS" value="ILS" id="ILS">ILS</option>
            <option data-testid="ETH" value="ETH" id="ETH">ETH</option>
            <option data-testid="XRP" value="XRP" id="XRP">XRP</option>
          </select>
        </label>
      </div>
    );
  }
}

InputCurrency.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldFunction: PropTypes.func.isRequired,
};

export default InputCurrency;
