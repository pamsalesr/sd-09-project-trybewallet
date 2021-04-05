import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Inputs from './Inputs';
import SelectOptions from './Select/SelectOptions';
import HandleSelect from './Select/HandleSelect';
import ButtonAdd from './ButtonAdd';
import './ExpenseForm.css';

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

class expenseForm extends React.Component {

  render() {
    const { editing, expenseDetails: { value = '', description = '' } = {} } = this.props;
    return (
      <div className="form-group">
        <Inputs
          value={ value }
          name="value"
          dataTestid="value-input"
          label="Valor"
        />
        <Inputs
          value={ description }
          name="description"
          dataTestid="description-input"
          label="Descrição"
        />
        <SelectOptions />
        <HandleSelect
          title="Forma de pagamento:"
          dataTestid="method-input"
          name="method"
          id="Metodo"
          array={ payWith }
        />
        <HandleSelect
          title="Tag:"
          dataTestid="tag-input"
          name="tag"
          array={ tags }
          id="idTag"
        />
        <ButtonAdd
          dataTestid={ editing ? 'edit-btn' : 'add-btn' }
          title={ !editing ? 'Adicionar despesa' : 'Editar despesa' }
        />
      </div>
    );
  }
}

expenseForm.propTypes = {
  value: PropTypes.string,
  description: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ wallet: { editing, expenseDetails } }) => ({
  expenseDetails,
  editing,
});

export default connect(mapStateToProps)(expenseForm);
