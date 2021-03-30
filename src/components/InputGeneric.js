import React from 'react';
import { string, func } from 'prop-types';

class InputGeneric extends React.Component {
  render() {
    const { title, type, name, value, functionChange, dataTestId } = this.props;
    return (
      <label htmlFor={ name }>
        { title }
        <input
          type={ type }
          name={ name }
          id={ name }
          value={ value }
          onChange={ functionChange }
          data-testid={ dataTestId }
        />
      </label>
    );
  }
}

InputGeneric.propTypes = {
  title: string.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  dataTestId: string.isRequired,
  functionChange: func.isRequired,
};

export default InputGeneric;
