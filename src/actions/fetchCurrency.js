import axios from 'axios';

const fetchCurrency = () => (dispatch) => {
  dispatch({
    type: 'FETCH_STARTED',
  });
  return axios.get('https://economia.awesomeapi.com.br/json/all')
    .then((response) => {
      dispatch({
        type: 'FETCH_SUCCESS',
        data: response.data,
      });
    });
};

export default fetchCurrency;
