export const ADDS_PLAYER = 'ADDS_PLAYER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_CORRECT = 'UPDATE_CORRECT';

export const addsPlayer = (user) => ({ type: ADDS_PLAYER, payload: user });

export const updateScore = (score) => ({ type: UPDATE_SCORE, payload: score });

export const updateCorrect = (correct) => ({ type: UPDATE_CORRECT, payload: correct });
