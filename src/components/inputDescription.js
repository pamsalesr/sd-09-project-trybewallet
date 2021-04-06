import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputDescription extends Component {
  render() {
    const { fieldFunction, fieldValue } = this.props;
    return (
      <div className="class-description">
        <label htmlFor="form-description">
          Descrição
          <input
            data-testid="description-input"
            name="description"
            id="form-description"
            type="text"
            value={ fieldValue }
            onChange={ fieldFunction }
          />
        </label>
      </div>
    );
  }
}

InputDescription.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldFunction: PropTypes.func.isRequired,
};

export default InputDescription;
