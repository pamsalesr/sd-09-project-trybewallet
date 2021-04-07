export const getCurrencies = async () => {
  try {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const json = await response.json();

    delete json.USDT;

    return json;
  } catch (error) {
    return error;
  }
};

export const convertValue = (value) => (Math.round((value) * 100) / 100);
