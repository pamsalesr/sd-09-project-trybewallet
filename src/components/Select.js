import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { textLabel, name, value, options, onChange } = this.props;
    return (
      <label htmlFor={ name }>
        { `${textLabel}` }
        <select
          data-testid={ `${name}-input` }
          id={ name }
          name={ name }
          value={ value }
          onChange={ onChange }
        >
          {options.map(((option) => (
            <option
              data-testid={ option }
              key={ option }
              value={ option }
            >
              { option }
            </option>
          )))}
        </select>
      </label>
    );
  }
}

export default Select;
