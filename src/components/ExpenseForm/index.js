import React from 'react';
import { connect } from 'react-redux';
import Inputs from './Inputs';
import SelectOptions from './Select/SelectOptions';
import HandleSelect from './Select/HandleSelect';

class expenseForm extends React.Component {
  render() {
    const payWith = [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];
    const tags = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

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
          <SelectOptions />
          <HandleSelect
            title="Forma de pagament"
            dataTestid="method-input"
            name="Forma-de-pagamento"
            array={ payWith }
          />
          <HandleSelect
            title="Tag"
            dataTestid="tag-input"
            name="tag"
            array={ tags }
          />
        </form>
      </div>
    );
  }
}

export default connect()(expenseForm);
