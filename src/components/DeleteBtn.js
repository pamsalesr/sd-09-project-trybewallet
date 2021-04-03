import React from 'react';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';
import { removeExpenseFromGlobalState } from '../actions';

class DeleteBtn extends React.Component {
  constructor() {
    super();

    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(expensesArray) {
    const { expenseId, removeExpense, value, total } = this.props;
    let newTotal = 0;
    if (expensesArray.length !== 1) {
      newTotal = (Number(total) - Number(value)).toFixed(2);
    }
    removeExpense(expensesArray, expenseId, Number(newTotal));
  }

  render() {
    const { expensesArray } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => this.deleteItem(expensesArray) }
      >
        X
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesArray: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispach) => ({
  removeExpense: (newArray, id, newTotal) => (
    dispach(removeExpenseFromGlobalState(newArray, id, newTotal))),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBtn);

DeleteBtn.propTypes = {
  expenseId: number,
  removeExpense: func,
  value: number,
  total: number,
}.isRequired;
