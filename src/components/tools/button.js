import React from 'react';

class Button extends React.Component {
  render() {
    const { testId, id, onClick, text } = this.props;
    return (
      <td>
        <button
          data-testid={ testId }
          type="button"
          id={ id }
          onClick={ onClick }
        >
          { text }
        </button>
      </td>
    );
  }
}

export default Button;
