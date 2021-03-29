// Coloque aqui suas actions

const login = (value) => ({
  type: 'ADD_EMAIL',
  value,
});

const wallet = (expense) => ({
  type: 'ADD_TO_WALLET',
  payload: {
    expense,
  },
});

export { login, wallet };
