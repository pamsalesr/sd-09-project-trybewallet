import { constructObj, edition, editExpense, setCurrencies } from '../actions';

export const mapDispatchToProps = (dispatch) => ({
  saveData: (value) => dispatch(constructObj(value)),
  saveDataEdited: (id, value) => dispatch(editExpense(id, value)),
  edition: (id, status) => dispatch(edition(id, status)),
  setCurrencies: (array) => dispatch(setCurrencies(array)),
});

export const mapStateToProps = (state) => ({
  nextId: state.wallet.expenses
    .reduce((_lastValue, currentValue) => currentValue.id + 1, 0),
  listExpenses: state.wallet.expenses,
  statusEdition: state.wallet.statusEdition,
  idEdition: state.wallet.idEdition,
  currencies: state.wallet.currencies,
});
