import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import CurrencyInput from './CurrencyInput';
import MethodInput from './MethodInput';
import TagInput from './TagInput';
import api from '../services/api';

const INITIAL_STATE = {
  value: 0,
  description: '',
  tag: '',
  currency: '',
  exchangeRates: {},
  method: '',
};

class FormAddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  addExpense() {
    const { tag, value, description, exchangeRates, currency, method } = this.state;
    const { addExpense } = this.props;
    addExpense({ tag, value, description, currency, exchangeRates, method });
    api.getCurrentCambio();
    this.setState({ ...INITIAL_STATE });
  }

  handleChangeCurrency({ selected, cambio }) {
    this.setState({ currency: selected, exchangeRates: cambio });
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          <input
            id="value-input"
            data-testid="value-input"
            value={ value }
            onChange={ ({ target }) => this.setState({ value: target.value }) }
          />
        </label>
        <label htmlFor="description-input">
          <input
            id="description-input"
            data-testid="description-input"
            value={ description }
            onChange={ ({ target }) => this.setState({ description: target.value }) }
          />
        </label>
        <CurrencyInput onChange={ (data) => this.handleChangeCurrency(data) } />
        <MethodInput onChange={ (method) => this.setState({ method }) } />
        <TagInput onChange={ (tag) => this.setState({ tag }) } />
        <button
          type="button"
          onClick={ () => this.addExpense() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormAddExpense.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(actions.addExpense(expense)),
});

export default connect(null, mapDispatchToProps)(FormAddExpense);
