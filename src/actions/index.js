import fetchApi from '../services/ApiRequest';

export const loginAction = (email) => ({
  type: 'LOGIN',
  email,
});

export const currenciesAction = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

export const expensesAction = (expenses) => ({
  type: 'EXPENSES',
  expenses,
});

export const totalAction = (somaTotal) => ({
  type: 'TOTAL',
  somaTotal,
});

export function fetchApiDispatch() {
  return async (dispatch) => {
    const currencies = await fetchApi();
    return dispatch(currenciesAction(Object.keys(currencies)));
  };
}
