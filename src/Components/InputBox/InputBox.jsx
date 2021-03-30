import React, { Component } from 'react';
import { string, func } from 'prop-types';

export default class InputBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value, id } = e.target;
    const { onUpdateForm } = this.props;
    // Following the id pattern, field name is set by removindo "-input"
    const field = id.slice(0, id.indexOf('-'));
    onUpdateForm(field, value);
  }

  render() {
    const { id, label, type, value } = this.props;

    return (
      <label htmlFor={ id }>
        {/* { label } */}
        <input
          type={ type }
          id={ id }
          data-testid={ id }
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }
}

InputBox.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  onUpdateForm: func.isRequired,
  value: string.isRequired,
};
