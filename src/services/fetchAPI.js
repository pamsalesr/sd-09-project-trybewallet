export default async function fetchApi() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const object = await response.json();
  delete object.USDT;
  return object;
}

// export default function fetchApi() {
//   return fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }
