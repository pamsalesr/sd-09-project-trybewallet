import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkExpensesAction } from '../actions/coinAPIAction';
import { resetStateAction, editItemAction } from '../actions';

class ButtonChange extends React.Component {
  constructor(props) {
    super(props);

    this.expenseClick = this.expenseClick.bind(this);
  }

  expenseClick(buttonName) {
    const { expenses } = this.props;
    const {
      addExpense,
      resetState,
      editExpense,
      id,
      value,
      method,
      currency,
      tag,
      description,
      exchangeRates } = this.props;

    if (buttonName === 'Adicionar despesa') {
      addExpense({ id, value, currency, method, tag, description });
    } else {
      const newExpense = expenses.map((expense) => {
        if (expense.id === id) {
          return { id, value, currency, method, tag, description, exchangeRates };
        }
        return expense;
      });
      editExpense(newExpense);
    }
    resetState();
  }

  render() {
    const { buttonName } = this.props;
    return (
      <button
        type="button"
        onClick={ () => this.expenseClick(buttonName) }
      >
        {buttonName}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  id: state.formStateReducer.id,
  value: state.formStateReducer.value,
  method: state.formStateReducer.method,
  currency: state.formStateReducer.currency,
  tag: state.formStateReducer.tag,
  description: state.formStateReducer.description,
  exchangeRates: state.formStateReducer.exchangeRates,
  buttonName: state.formStateReducer.button,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expenses) => dispatch(thunkExpensesAction(expenses)),
  resetState: () => dispatch(resetStateAction()),
  editExpense: (editItem) => dispatch(editItemAction(editItem)),
});

ButtonChange.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  method: PropTypes.string,
  currency: PropTypes.string,
  tag: PropTypes.string,
  description: PropTypes.string,
  addExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ButtonChange);
