import fetchApi from '../services/api';

// Coloque aqui suas actions
const updateUserEmail = (store) => ({ type: 'EMAIL_REGISTERED', email: store });

const GET_CURRENCY = 'GET_CURRENCY';

function getCurrency(json) {
  return { type: GET_CURRENCY, payload: json };
}

export function fetchCurrency() {
  return async (dispatch) => dispatch(getCurrency(await fetchApi()));
}

export default updateUserEmail;
