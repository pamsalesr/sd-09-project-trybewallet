async function getCurrencies() {
  try {
    const endPoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endPoint);
    const object = await response.json();
    delete object.USDT;
    return object;
  } catch (error) {
    console.log(error);
  }
}

export default getCurrencies;
