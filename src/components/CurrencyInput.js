import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

const CURRENCIES = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
  'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];

class CurrencyInput extends React.Component {
  async componentDidMount() {
    this.cambio = await api.getCurrentCambio();
  }

  async handleChange({ target }) {
    const { value } = target;
    const { onChange } = this.props;
    onChange({ selected: value, cambio: this.cambio });
  }

  render() {
    return (
      <select data-testid="currency-input" onChange={ (ev) => this.handleChange(ev) }>
        {CURRENCIES.map(
          (currency) => (
            <option
              data-testid={ currency }
              key={ currency }
              value={ currency }
            >
              {currency}
            </option>),
        )}
      </select>
    );
  }
}

CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CurrencyInput;
