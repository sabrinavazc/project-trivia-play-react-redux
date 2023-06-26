import { ADDS_PLAYER, UPDATE_SCORE, UPDATE_CORRECT } from '../actions';

const INITAL_STATE = {
  email: '',
  name: '',
  result: {},
  score: 0,
  assertions: 0,
};

const player = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case ADDS_PLAYER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
      score: 0,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case UPDATE_CORRECT:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };

  default: return state;
  }
};

export default player;
