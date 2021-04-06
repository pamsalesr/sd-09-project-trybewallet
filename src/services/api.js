const fetchApi = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((r) => r.json()
      .then(
        (json) => {
          delete json.USDT;
          return json;
        },
      ))
);

export default fetchApi;
