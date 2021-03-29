import React, { Component } from 'react';
import { string, arrayOf } from 'prop-types';

export default class Dropdown extends Component {
  render() {
    const { id, options, label } = this.props;

    return (
      <label htmlFor={ id }>
        { label }
        <select id={ id } data-testid={ id }>
          <option value="">Selecione uma opção</option>
          {
            options.map((item) => (
              <option key={ item } value={ item } data-testid={ item }>
                { item }
              </option>
            ))
          }
        </select>
      </label>
    );
  }
}

Dropdown.propTypes = {
  id: string.isRequired,
  options: arrayOf(string).isRequired,
  label: string.isRequired,
};
