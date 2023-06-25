export const ACTION_USER = 'ACTION_USER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const GET_RIGHTS = 'GET_RIGHTS';

export const actionUser = (user) => ({ type: ACTION_USER, payload: user });

export const updateScore = (score) => ({ type: UPDATE_SCORE, payload: score });

export const getRights = (payload) => ({
  type: GET_RIGHTS,
  payload,
});