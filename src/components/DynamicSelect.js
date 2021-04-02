import React from 'react';
import PropTypes from 'prop-types';

class DynamicSelect extends React.Component {
  render() {
    const { textLabel, name, options, handleChange } = this.props;
    return (
      <label htmlFor={ name }>
        { `${textLabel}` }
        <select
          data-testid={ `${name}-input` }
          id={ name }
          name={ name }
          onChange={ handleChange }
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

DynamicSelect.propTypes = {
  textLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DynamicSelect;

// ** Source https://github.com/tryber/sd-09-project-trybewallet/pull/7/files /
