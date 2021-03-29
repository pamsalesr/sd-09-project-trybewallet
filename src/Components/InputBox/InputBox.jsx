import React, { Component } from 'react';
import { string } from 'prop-types';

export default class InputBox extends Component {
  render() {
    const { id, label, type } = this.props;

    return (
      <label htmlFor={ id }>
        { label }
        <input type={ type } id={ id } data-testid={ id } />
      </label>
    )
  }
}

InputBox.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  type: string.isRequired,
};
