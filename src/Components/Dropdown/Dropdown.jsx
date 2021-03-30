import React, { Component } from 'react';
import { string, arrayOf, func } from 'prop-types';

export default class Dropdown extends Component {
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
    const { id, options, label, value } = this.props;

    return (
      <label htmlFor={ id }>
        { label }
        <select
          id={ id }
          data-testid={ id }
          value={ value }
          onChange={ this.handleChange }
        >
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
  onUpdateForm: func.isRequired,
  value: string.isRequired,
};
