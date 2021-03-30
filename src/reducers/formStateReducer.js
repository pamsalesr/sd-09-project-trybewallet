import { GETITEM_ACTION, EDITSTATE_ACTION, RESETSTATE_ACTION } from '../actions/index';

const INITIAL_STATE = {
  id: 0,
  value: '0',
  method: 'Dinheiro',
  currency: 'USD',
  tag: 'Alimentacao',
  description: '',
  exchangeRates: {},
  button: 'Adicionar despesa',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EDITSTATE_ACTION:
    return { ...state, [action.name]: action.value };
  case RESETSTATE_ACTION:
    return { ...INITIAL_STATE, id: state.id + 1 };
  case GETITEM_ACTION:
    return { ...action.getState, button: 'Editar despesa' };
  default:
    return state;
  }
};

export default walletReducer;
