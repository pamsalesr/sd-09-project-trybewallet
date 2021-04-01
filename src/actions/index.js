// Coloque aqui suas actions
import { SUBMIT_FORM, SUBMIT_LOGIN, SUBMIT_FORM_API } from './typeActions';

export const onSubmitLogin = (state) => ({
  type: SUBMIT_LOGIN,
  email: state,
});

export const fetchAPI = (state) => ({
  type: SUBMIT_FORM_API,
  currency: state,
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
};
