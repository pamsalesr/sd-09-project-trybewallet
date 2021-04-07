const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br';

const getAPI = async () => {
  const response = await fetch(`${CURRENCY_BASE_API}/json/all`);
  const issJson = await response.json();
  delete issJson.USDT;
  return issJson;
};

export default getAPI;
