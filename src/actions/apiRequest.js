import currenciesAPI from '../services/currenciesAPI';

const apiRequest = () => (
  (dispatch) => {
    currenciesAPI('all')
      .then((data) => dispatch({ currencies: data, type: 'REQUEST_CURRENCIES' }));
  }
);

export default apiRequest;
