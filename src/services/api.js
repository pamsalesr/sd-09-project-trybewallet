function getCurrentCambio() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(url).then((res) => res.json());
}

export default { getCurrentCambio };
