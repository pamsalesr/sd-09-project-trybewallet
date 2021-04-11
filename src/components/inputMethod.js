import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './inputMethod.css';

class InputMethod extends Component {
  render() {
    const { fieldFunction, fieldValue, fieldDefault } = this.props;
    return (
      <div className="class-method">
        <label htmlFor="form-method">
          método de Pagamento&nbsp;&nbsp;
          <select
            data-testid="method-input"
            id="form-method"
            name="method"
            type="text"
            value={ fieldValue }
            onChange={ fieldFunction }
            defaultValue={ fieldDefault }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}

InputMethod.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldFunction: PropTypes.func.isRequired,
  fieldDefault: PropTypes.string.isRequired,
};

export default InputMethod;
