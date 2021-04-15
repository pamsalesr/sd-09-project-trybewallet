import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './inputCurrency.css';

class InputCurrency extends Component {
  render() {
    const { fieldFunction, fieldValue, fieldDefault, currenciesApi } = this.props;
    const { currencies } = currenciesApi;

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
  fieldDefault: PropTypes.string.isRequired,
  currenciesApi: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
  }).isRequired,
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(InputCurrency);
