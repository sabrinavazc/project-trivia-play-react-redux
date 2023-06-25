import { ACTION_USER, UPDATE_SCORE, GET_RIGHTS } from '../actions';

const INITAL_STATE = {
  email: '',
  name: '',
  result: {},
  score: 0,
  assertions: 0,
};

const player = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case ACTION_USER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case GET_RIGHTS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };

  default: return state;
  }
};

export default player;