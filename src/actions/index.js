// Coloque aqui suas actions
import getEconomicData from '../services/economicAPI';

export const EMAIL_INPUT = 'EMAIL_INPUT';
export const REQUEST_ECONOMIC_DATA = 'REQUEST_ECONOMIC_DATA';
export const REQUEST_ECONOMIC_DATA_SUCCESS = 'REQUEST_ECONOMIC_DATA_SUCCESS';

export const emailAction = (email) => ({
  type: EMAIL_INPUT,
  email,
});

export const requestEconomicDataAction = () => ({
  type: REQUEST_ECONOMIC_DATA,
});

export const receiveEconomicSuccessAction = (data) => ({
  type: REQUEST_ECONOMIC_DATA_SUCCESS,
  data,
});

export function fetchEconomicDataAction() {
  return async (dispatch) => {
    dispatch(requestEconomicDataAction());

    const jsonData = await getEconomicData();
    dispatch(receiveEconomicSuccessAction(jsonData));
  };
}
