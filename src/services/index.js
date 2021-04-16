export const CurrencyApi = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const aroundPriceChange = (value) => (
  Math.round(value * 100) / 100
);

export const convertedToExchange = (value, exchange) => (
  aroundPriceChange(value * exchange)
);

export const validateFieldsForm = ({ value, description, currency, method, tag }) => {
  if (value && description && currency && method && tag) {
    return false;
  }
  return true;
};

export const updateTotalPrice = (expense, state, total) => {
  const {
    value: valueProps,
    currency: currencyProps,
    exchangeRates,
  } = expense;

  const priceProps = convertedToExchange(
    valueProps,
    exchangeRates[currencyProps].ask,
  );

  const priceState = convertedToExchange(
    state.value,
    exchangeRates[state.currency].ask,
  );

  const totalPrice = aroundPriceChange(
    (total - priceProps) + priceState,
  );

  return totalPrice;
};
