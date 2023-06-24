const BASE_URL = 'https://opentdb.com/api.php?amount=5&token=';

const fetchQuestions = async (token) => {
  const res = await fetch(BASE_URL + token);
  const data = await res.json();
  return data;
};

export default fetchQuestions;
