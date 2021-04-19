import React from 'react';
import PropTypes from 'prop-types';

export default class ValueInput extends React.Component {
  render() {
    const { value, valueChangeHandler } = this.props;
    return (
      <div>
        <label htmlFor={ `value-input-${value}` }>
          Valor:
          <input
            data-testid="value-input"
            type="text"
            name="value"
            value={ value }
            onChange={ valueChangeHandler }
          />
        </label>
      </div>

    );
  }
}

ValueInput.propTypes = {
  valueChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
