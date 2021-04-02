import { constructObj, constructEditObj } from '../actions';

export const mapDispatchToProps = (dispatch) => ({
  saveData: (value) => dispatch(constructObj(value)),
  saveDataEdited: (id, value) => dispatch(constructEditObj(id, value)),
});

export const mapStateToProps = (state) => ({
  nextId: state.wallet.expenses.length,
  listExpenses: state.wallet.expenses,
});
