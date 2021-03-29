import React from 'react';
import { connect } from 'react-redux';
import Inputs from './Inputs';

class expenseForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <Inputs
            name="Valor"
            dataTestid="value-input"
          />
          <Inputs
            name="Descrição:"
            dataTestid="description-input"
          />
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
