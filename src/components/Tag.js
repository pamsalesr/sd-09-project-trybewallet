import React from 'react';
import PropTypes from 'prop-types';

class Tag extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          data-testid="tag-input"
          value={ value }
          onChange={ onChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Tag;
