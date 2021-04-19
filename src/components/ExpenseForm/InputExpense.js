import React from 'react';
import PropTypes from 'prop-types';

function InputExpense(props) {
  const { name } = props;
  return (
    <input
      type="text"
      name={ name }
      data-testid={ `${name}-input` }
      id={ name }
      { ...props }
    />
  );
}

InputExpense.propTypes = {
  name: PropTypes.string.isRequired,
};

export default InputExpense;
