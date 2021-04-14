import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './inputCurrency.css';

class InputCurrency extends Component {
  render() {
    const { fieldFunction, fieldValue, fieldDefault, wallet, exchanges } = this.props;
    const { currencies, editor } = wallet;
    let arrayCurrency;

    if (editor) {
      arrayCurrency = exchanges;
    } else {
      arrayCurrency = currencies;
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
            { Object.keys(arrayCurrency).map((currency) => (
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
  wallet: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
  }).isRequired,
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(InputCurrency);
