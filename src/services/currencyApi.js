async function currencyApi() {
  try {
    const result = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await result.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default currencyApi;
