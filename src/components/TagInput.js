import React from 'react';
import PropTypes from 'prop-types';

class TagInput extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <select data-testid="tag-input" onChange={ (ev) => onChange(ev.target.value) }>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }
}

TagInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TagInput;
