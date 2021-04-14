import React from 'react';

class Input extends React.Component {
  render() {
    const { name, handleChange, testId, type, text, value } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {text}
          <input
            data-testid={ testId }
            type={ type }
            name={ name }
            id={ name }
            value={ value }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

export default Input;
