// Coloque aqui suas actions
import currencyApi from '../service/currencyApi';

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST = 'REQUEST';
export const REQUEST_SECCESS = 'REQUEST_SECCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const EXCHANGE_RATES = 'EXCHANGE_RATS';
export const EXPENSES_DATA = 'EXPENSES_DATA';
export const DELETE_TABLE = 'DELETE_TABLE';

export const userEmailAction = (email) => ({
  type: USER_EMAIL,
  email,
});

export const request = () => ({
  type: REQUEST,
  loading: true,
});

export const requestSuccess = (data) => ({
  type: REQUEST_SECCESS,
  loading: false,
  data,
});

export const requestRerror = (error) => ({
  type: REQUEST_SECCESS,
  loading: false,
  error,
});

export const requestApiAction = () => (dispatch) => {
  request();
  currencyApi()
    .then(
      (data) => dispatch(requestSuccess(data)),
      (error) => dispatch(requestRerror(error)),
    );
};

export const requestExangeRatesAction = (data) => ({
  type: EXCHANGE_RATES,
  data,
});

export const expensesDataAction = (object) => ({
  type: EXPENSES_DATA,
  payload: {
    object,
  },
});
export const exchangeRatesAction = () => (dispatch) => {
  request();
  currencyApi()
    .then(
      (data) => dispatch(requestExangeRatesAction(data)),
      (error) => dispatch(requestRerror(error)),
    );
};

export const deleteTableLineAction = (index) => (dispatch) => {
  dispatch({
    type: DELETE_TABLE,
    index,
  });
};
