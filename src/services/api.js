async function moneyData() {
  const money = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((response) => {
      const keys = Object.keys(response);
      const allKeys = keys.filter((coin) => coin !== 'USDT');
      const allMoney = allKeys.map((key) => response[key]);
      return allMoney;
    });
  return money;
}

export default moneyData;
