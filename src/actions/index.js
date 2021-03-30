export const loginAction = (email) => ({
  type: 'LOGIN',
  email,
});

export const walletAction = (currencies, expenses) => ({
  type: 'WALLET',
  currencies,
  expenses,
});

export const totalAction = (somaTotal) => ({
  type: 'TOTAL',
  somaTotal,
});
