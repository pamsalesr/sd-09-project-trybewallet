import currenciesAPI from '../services/currenciesAPI';

const addExpense = (expense) => (
  (dispatch) => {
    currenciesAPI('all')
      .then((data) => dispatch({ expense, data, type: 'ADD_EXPENSE' }));
  }
);

export default addExpense;
