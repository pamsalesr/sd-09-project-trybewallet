// Coloque aqui suas actions
import { SUBMIT_FORM, SUBMIT_LOGIN, SUBMIT_FORM_API, REMOVE_ID } from './typeActions';

export const removeId = (state) => ({
  type: REMOVE_ID,
  newExpenses: state,
});

export const onSubmitLogin = (state) => ({
  type: SUBMIT_LOGIN,
  email: state,
});

export const fetchAPI = (state) => ({
  type: SUBMIT_FORM_API,
  exchange: state,
});

export const sendDataForms = (state) => ({
  type: SUBMIT_FORM,
  state: {
    id: state.id,
    value: state.value,
    description: state.description,
    currency: state.currency,
    method: state.method,
    tag: state.tag,
    exchangeRates: state.exchangeRates,
  },

});

export function onSubmitForm(state) {
  return (dispatch) => {
    dispatch(sendDataForms(state));

    const endPoint = 'https://economia.awesomeapi.com.br/json/all';
    fetch(endPoint)
      .then((jsonResult) => {
        jsonResult.json()
          .then((response) => {
            dispatch(fetchAPI(response));
          });
      });
  };
}
