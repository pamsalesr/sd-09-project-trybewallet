export default async function getCurrencyApi() {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(endPoint);
    const object = await response.json();
    delete object.USDT;

    if (object.error) throw new Error(object.error);

    return object;
  } catch (error) {
    console.log(error);
  }
}
