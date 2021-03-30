import React from 'react';
import PropTypes from 'prop-types';

class MethodInput extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <select data-testid="method-input" onChange={ (ev) => onChange(ev.target.value) }>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }
}

MethodInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default MethodInput;
