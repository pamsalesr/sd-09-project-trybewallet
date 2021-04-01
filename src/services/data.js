export const coins = ['USD',
  'CAD',
  'EUR',
  'GBP',
  'ARS',
  'BTC',
  'LTC',
  'JPY',
  'CHF',
  'AUD',
  'CNY',
  'ILS',
  'ETH',
  'XRP',
];

export const methodsPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

export const tagsData = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export const getAPI = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
};
