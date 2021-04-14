import React from 'react';
// import { connect } from 'react-redux';
// import { string } from 'prop-types';

class NewExpenseComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      edit: {
        editable: false,
        id: 0,
      },
    };
  }

  render() {
    const { value, description } = this.state;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            id="value-input"
            name="value"
            onChange={ this.handleInputs }
            value={ value }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          { this.renderCurrencySelector() }
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          { this.renderPaymentMethod() }
        </label>
        <label htmlFor="tag-input">
          Tag:
          { this.renderExpenseTag() }
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            name="description"
            onChange={ this.handleInputs }
            value={ description }
          />
        </label>
        { this.renderAddEditButton() }
      </div>
    );
  }
}

// const mapStatetoProps = (state) => ({
//   email: state.user.email,
// });

// NewExpenseComponent.propTypes = {
//   email: string,
// }.isRequired;

// export default connect(mapStatetoProps)(NewExpenseComponent);
export default NewExpenseComponent;
