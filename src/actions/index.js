export const types = {
  SET_EMAIL: 'SET_EMAIL',
};

function setEmail(email) {
  return {
    type: types.SET_EMAIL,
    email,
  };
}

export default {
  setEmail,
};
