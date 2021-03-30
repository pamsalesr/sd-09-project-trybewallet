// Coloque aqui suas actions
import currencyApi from '../service/currencyApi';

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST = 'REQUEST';
export const REQUEST_SECCESS = 'REQUEST_SECCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

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
