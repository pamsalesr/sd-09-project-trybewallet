const fetchApi = 'https://economia.awesomeapi.com.br/json/all';

const currencyApi = async () => {
  const request = await fetch(fetchApi);
  const object = await request.json();
  return object;
};

export default currencyApi;
