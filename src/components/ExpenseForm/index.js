import React from 'react';
import { connect } from 'react-redux';
import Inputs from './Inputs';
import SelectOptions from './Select/SelectOptions';
import HandleSelect from './Select/HandleSelect';
import ButtonAdd from './ButtonAdd';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: '',
  method: '',
  id: 0,
  tag: '',
};

class expenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

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
          name="description:"
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
        <ButtonAdd />
      </div>
    );
  }
}

export default connect()(expenseForm);
