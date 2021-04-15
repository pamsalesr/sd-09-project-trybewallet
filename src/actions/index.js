import fetchCurrencyApi from '../services/fetchCurrencyApi';

// Coloque aqui suas actions
const userEmailDispatch = (email) => ({
  email,
  type: 'USER_EMAIL_DISPATCH',
});

export default userEmailDispatch;
