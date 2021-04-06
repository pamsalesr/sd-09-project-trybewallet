export default async function fetchApi() {
  const result = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await result.json();
  delete response.USDT;
  return response;
}
