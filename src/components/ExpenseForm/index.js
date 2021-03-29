import React from 'react';
import { connect } from 'react-redux';

class expenseForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <div>
            <p>
              Valor R$
              <span data-testid="value-input"> 0</span>
            </p>
          </div>
          <div>
            <p>
              Descrição:
              <span data-testid="description-input"> Alimentação</span>
            </p>
          </div>
          <div>
            <p>
              Moeda:
              <span data-testid="currency-input"> BRL</span>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(expenseForm);
