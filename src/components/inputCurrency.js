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
            { Object.keys(arrayTemp).map((currency) => (
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
