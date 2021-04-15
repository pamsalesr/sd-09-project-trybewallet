const EXPENSE = 'EXPENSE';
const DELETE = 'DELETE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const CURRENCIES = 'CURRENCIES';
const RATES = 'RATES';

export const expenseAction = (expense) => ({
  type: EXPENSE,
  expense,
});

export const deleteExpense = (newExpenses) => ({
  type: DELETE,
  newExpenses,
});

export const editExpenseAction = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const currenciesAction = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const ratesAction = (rates) => ({
  type: RATES,
  rates,
});

export const fetchCurrency = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const responseObject = await response.json();
      const currenciesArray = Object.keys(responseObject);
      const newCurrencies = currenciesArray.filter((elem) => elem !== 'USDT');
      dispatch(currenciesAction(newCurrencies));
      dispatch(ratesAction(responseObject));
    } catch (error) {
      console.log(error);
    }
  }
);
