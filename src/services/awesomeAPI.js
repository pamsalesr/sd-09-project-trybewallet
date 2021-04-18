const APIURL = 'https://economia.awesomeapi.com.br/json/';

const awesomeAPI = (currency) => (
  fetch(`${APIURL}${currency.split().join()}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default awesomeAPI;
