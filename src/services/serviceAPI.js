const listCurrencies = async () => {
  const requestFeth = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJSON = await requestFeth.json();

  return requestJSON;
};

export default listCurrencies;
