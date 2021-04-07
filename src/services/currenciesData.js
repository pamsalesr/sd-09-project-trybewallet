export default async () => {
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
