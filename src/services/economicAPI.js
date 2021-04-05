const ECONOMIC_BASE_API = 'https://economia.awesomeapi.com.br';

const getEconomicData = async () => {
  const economicRequest = fetch(`${ECONOMIC_BASE_API}/json/all`);
  const economicJson = await economicRequest.json();

  return economicJson;
};

export default getEconomicData;
