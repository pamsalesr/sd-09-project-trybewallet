import { EDIT_EXPENSE, RESET_FORM } from '../actions';

const initialState = {
  method: 'creation',
  formData: {
    value: '',
    currency: '',
    description: '',
    method: '',
    tag: '',
  },
};

const formReducer = (state = initialState, action) => {
  const { type, expense: formData } = action;
  switch (type) {
  case EDIT_EXPENSE:
    return {
      method: 'edition',
      formData,
    };
  case RESET_FORM:
    return initialState;
  default:
    return state;
  }
};

export default formReducer;
