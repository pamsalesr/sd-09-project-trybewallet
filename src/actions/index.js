// Coloque aqui suas actions
export function userLogin(userEmail) {
  return { type: 'USERLOGIN', userEmail };
}

export function addExpend(data) {
  return { type: 'ADD_EXPEND', data };
}

function requestCurrency() {
  return { type: 'REQUEST_CURRENCY' };
}

function responseCurrencyExpenses(response) {
  return { type: 'RESPONSE_CURRENCY_EXPENSES', response };
}

function requestFailed(response) {
  return { type: 'REQUEST_FAILED', response };
}

function responseCurrencyList(response) {
  return { type: 'RESPONSE_CURRENCY_LIST', response };
}

export function fetchCurrencyExpenses() {
  return async (dispatch) => {
    dispatch(requestCurrency());

    const requestResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await requestResponse.json();
    dispatch(responseCurrencyExpenses(response));
    dispatch(requestFailed(response));
  };
}

export function fetchCurrencyList() {
  return async (dispatch) => {
    dispatch(requestCurrency());

    const requestResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await requestResponse.json();
    dispatch(responseCurrencyList(response));
    dispatch(requestFailed(response));
  };
}
