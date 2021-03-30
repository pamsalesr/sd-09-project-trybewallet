const currenciesFetch = async () => {
  try {
    const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
    const promise = await endpoint.json();
    delete promise.USDT;
    return promise;
  } catch (error) {
    return console.log(error);
  }
};

export default currenciesFetch;
