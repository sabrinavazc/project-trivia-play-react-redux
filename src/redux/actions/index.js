export const ACTION_USER = 'ACTION_USER';
export const ADD_SCORE = 'ADD_SCORE';
export const GET_RIGHTS = 'GET_RIGHTS';

export const actionUser = (user) => ({
  type: ACTION_USER,
  payload: user,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const getRights = (payload) => ({
  type: GET_RIGHTS,
  payload,
});
