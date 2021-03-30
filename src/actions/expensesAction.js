import {
  REQUEST_CURRENCY,
  GET_CURRENCY_AND_DISPENSE,
  FAILURE_CURRENCY } from './actionsTypes';

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const getCurrencyAndDispense = (dispenseData) => ({
  type: GET_CURRENCY_AND_DISPENSE,
  dispenseData,
});

const failureCurrency = (error) => ({
  type: FAILURE_CURRENCY,
  error,
});

const expensesAction = (dispenseData) => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currency = await response.json();
    dispenseData.exchangeRates = currency;
    delete dispenseData.currencyList;
    dispatch(getCurrencyAndDispense(dispenseData));
  } catch (error) {
    dispatch(failureCurrency(error));
  }
};

export default expensesAction;
