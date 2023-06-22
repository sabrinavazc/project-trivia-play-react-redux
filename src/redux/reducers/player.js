import { ACTION_USER } from '../actions';

const INITAL_STATE = { email: '', userName: '' };

const player = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case ACTION_USER:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      userName: action.payload.userName,
    };
  default: return state;
  }
};

export default player;
