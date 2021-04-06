import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputMethod extends Component {
  render() {
    const { fieldFunction, fieldValue } = this.props;
    return (
      <div className="class-method">
        <label htmlFor="form-method">
          Método de Pagamento
          <select
            data-testid="method-input"
            id="form-method"
            name="method"
            type="text"
            value={ fieldValue }
            onChange={ fieldFunction }
          >
            <option value="money" id="money">Dinheiro</option>
            <option value="credit" id="credit">Cartao de Crédito</option>
            <option value="debit" id="debit">Cartão de Débito</option>
          </select>
        </label>
      </div>
    );
  }
}

InputMethod.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldFunction: PropTypes.func.isRequired,
};

export default InputMethod;
