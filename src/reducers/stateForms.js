const value = {
  edit: 'false',
  forms: {
    id: -1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: '',
  },
};

const stateForms = (state = value, action) => {
  switch (action.type) {
  case 'addExchangeRates':
    return {
      ...state,
      forms: { ...state.forms, exchangeRates: action.state },
    };
  case 'addState':
    return {
      ...state,
      forms: { ...state.forms, [action.name]: action.value },
    };
  case 'addId':
    return {
      ...state,
      forms: { ...state.forms, id: state.forms.id + 1 },
    };
  case 'addStateForms':
    return {
      ...state,
      forms: {
        ...state.forms,
        ...action.obj,
      },
    };
  case 'forsmAddState':
    return {
      ...state,
      forms: action.obj,
    };
  case 'true':
    return {
      ...state,
      edit: '',
    };
  case 'false':
    return {
      ...state,
      edit: 'false',
    };
  default:
    return state;
  }
};

export default stateForms;
