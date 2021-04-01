import React from 'react';
import PropTypes from 'prop-types';

class PaymentMethod extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          data-testid="method-input"
          value={ value }
          onChange={ onChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

PaymentMethod.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaymentMethod;
