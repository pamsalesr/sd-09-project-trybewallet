import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputTag extends Component {
  render() {
    const { fieldFunction, fieldValue } = this.props;
    return (
      <div className="class-tag">
        <label htmlFor="form-tag">
          Tag
          <select
            data-testid="tag-input"
            id="form-tag"
            name="tag"
            type="text"
            value={ fieldValue }
            onChange={ fieldFunction }
          >
            <option value="food" id="food">Alimentação</option>
            <option dvalue="recreation" id="recreation">Lazer</option>
            <option value="work" id="work">Trabalho</option>
            <option value="transport" id="transport">Transporte</option>
            <option value="health" id="health">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

InputTag.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldFunction: PropTypes.func.isRequired,
};

export default InputTag;
