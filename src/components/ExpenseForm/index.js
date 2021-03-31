import React from 'react';
import { connect } from 'react-redux';
import Inputs from './Inputs';
import SelectOptions from './Select/SelectOptions';
import HandleSelect from './Select/HandleSelect';
import ButtonAdd from './ButtonAdd';

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
        <Inputs
          name="value"
          dataTestid="value-input"
        />
        <Inputs
          name="description"
          dataTestid="description-input"
        />
        <SelectOptions />
        <HandleSelect
          title="Forma de pagamento"
          dataTestid="method-input"
          name="method"
          array={ payWith }
        />
        <HandleSelect
          title="Tag"
          dataTestid="tag-input"
          name="tag"
          array={ tags }
        />
        <ButtonAdd title="Adicionar despesa" />
      </div>
    );
  }
}

export default connect()(expenseForm);
