import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class InputCurrency extends Component {
  render() {
    const { fieldFunction, fieldValue, wallet } = this.props;
    const { currencies } = wallet;

    return (
      <div className="class-currency">
        <label htmlFor="form-currency">
          Moeda
          <select
            data-testid="currency-input"
            id="form-currency"
            name="currency"
            type="text"
            value={ fieldValue }
            onChange={ fieldFunction }
            defaultValue="USD"
          >
            { Object.keys(currencies).map((currency) => (
              <option
                data-testid={ currency }
                value={ currency }
                key={ currency }
                id={ currency }
              >
                { currency }
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

InputCurrency.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldFunction: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
  }).isRequired,
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(InputCurrency);

// {/* <option data-testid="USD" value="USD">USD</option>
// <option data-testid="CAD" value="CAD">CAD</option>
// <option data-testid="EUR" value="EUR">EUR</option>
// <option data-testid="GBP" value="GBP">GBP</option>
// <option data-testid="ARS" value="ARS">ARS</option>
// <option data-testid="BTC" value="BTC">BTC</option>
// <option data-testid="LTC" value="LTC">LTC</option>
// <option data-testid="JPY" value="JPY">JPY</option>
// <option data-testid="CHF" value="CHF">CHF</option>
// <option data-testid="AUD" value="AUD">AUD</option>
// <option data-testid="CNY" value="CNY">CNY</option>
// <option data-testid="ILS" value="ILS">ILS</option>
// <option data-testid="ETH" value="ETH">ETH</option>
// <option data-testid="XRP" value="XRP">XRP</option> */}
