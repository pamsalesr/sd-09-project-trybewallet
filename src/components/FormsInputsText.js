import React from 'react';

class FormsInputsText extends React.Component {
  render() {
    return (
      <forms>
        <label htmlFor="expense-value">
          Valor da despesa
          <input
            type="text"
            data-testid="value-input"
            id="expense-value"
          />
        </label>
        <label htmlFor="expense-description">
          Descrição da despesa
          <input
            type="text"
            data-testid="description-input"
            id="expense-description"
          />
        </label>
      </forms>
    );
  }
}

export default FormsInputsText;
