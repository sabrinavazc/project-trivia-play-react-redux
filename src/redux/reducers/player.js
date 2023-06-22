import { ACTION_USER } from '../actions';

const INITAL_STATE = { email: '', name: '' };

const player = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case ACTION_USER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
      score: 0,
    };
  default: return state;
  }
};

export default player;
