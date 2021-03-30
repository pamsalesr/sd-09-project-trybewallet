export const LOGIN_INFORMATION = 'LOGIN_INFORMATION';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export function saveLoginInformation(email, validation) {
  return {
    type: 'LOGIN_INFORMATION',
    email,
    validation,
  };
}

export function getCurrencies() {
  return {
    type: 'GET_CURRENCIES',
    email,
    validation,
  };
}