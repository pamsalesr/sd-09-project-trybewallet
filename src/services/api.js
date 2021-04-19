// async function moneyData() {
//   const money = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const data = await money.json();
//   return data;
// }

const fetchApi = 'https://economia.awesomeapi.com.br/json/all';

const moneyData = async () => {
  const request = await fetch(fetchApi);
  console.log(request);
  const object = await request.json();
  return object;
};

export default moneyData;
