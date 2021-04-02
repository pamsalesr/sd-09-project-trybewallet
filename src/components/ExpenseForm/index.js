import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Inputs from './Inputs';
import SelectOptions from './Select/SelectOptions';
import HandleSelect from './Select/HandleSelect';
import ButtonAdd from './ButtonAdd';
import '../components.css';

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
    const { expenseDetails: { value = '', description = '' } = {} } = this.props;
    return (
      <div className="form-group">
        <Inputs
          value={ value }
          name="value"
          dataTestid="value-input"
        />
        <Inputs
          value={ description }
          name="description"
          dataTestid="description-input"
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
        <ButtonAdd title="Adicionar despesa" />
      </div>
    );
  }
}

expenseForm.propTypes = {
  value: PropTypes.string,
  description: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ wallet: { expenseDetails } }) => ({
  expenseDetails,
});

export default connect(mapStateToProps)(expenseForm);
