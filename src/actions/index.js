export const EMAIL_USER = 'EMAIL_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ERROR_EXPENSE = 'ERROR_EXPENSE';
export const SUM_PRICE_VALUE = 'SUM_PRICE_VALUE';

const dataEmailUser = (email) => ({
  type: EMAIL_USER,
  email,
});

async function fetchMoedas() {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}

const addExpenseAction = (dispesaAtual, moedas) => ({
  type: ADD_EXPENSE,
  dispesaAtual,
  moedas,
});

const addExpenseActionError = (error) => ({
  type: ERROR_EXPENSE,
  error,
});

// export const addExpenseThunk = (dispesaAtual) => async (dispatch) => {
//   const moedas = await fetchMoedas();
//   dispatch(addExpenseAction(dispesaAtual, moedas));
// };

const addExpenseThunk = (dispesaAtual) => (
  (dispatch) => {
    fetchMoedas()
      .then((response) => dispatch(addExpenseAction(dispesaAtual, response)))
      .catch((error) => dispatch(addExpenseActionError(error)));
  }
);

const totalPrice = (value, moeda) => ({
  type: SUM_PRICE_VALUE,
  value,
  moeda,
});

export { addExpenseThunk, dataEmailUser, totalPrice };
