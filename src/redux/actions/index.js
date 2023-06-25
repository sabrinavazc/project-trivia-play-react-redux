export const ADDS_PLAYER = 'ADDS_PLAYER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const GET_RIGHTS = 'GET_RIGHTS';

export const addsPlayer = (user) => ({ type: ADDS_PLAYER, payload: user });

export const updateScore = (score) => ({ type: UPDATE_SCORE, payload: score });

export const getRights = (payload) => ({
  type: GET_RIGHTS,
  payload,
});
