const saveCurrency = (object) => ({
  type: 'SAVE_DESPENSES',
  payload: {
    object,
  },
});

export default saveCurrency;
