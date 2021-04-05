import React from 'react';

class CurrencySelect extends React.Component {
  render() {
    return (
      <label htmlFor="moeda">
        Moeda
        <select name="moeda" id="moeda" data-testid="currency-input">
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ARS">ARS</option>
          <option value="BTC">BTC</option>
          <option value="LTC">LTC</option>
          <option value="JPY">JPY</option>
          <option value="CHF">CHF</option>
          <option value="AUD">AUD</option>
          <option value="CNY">CNY</option>
          <option value="ILS">ILS</option>
          <option value="ETH">ETH</option>
          <option value="XRP">XRP</option>
        </select>
      </label>
    );
  }
}

export default CurrencySelect;
