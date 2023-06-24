import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import Header from '../components/Header';
import fetchQuestions from '../helpers/fetchQuestions';
import Loading from '../components/Loading';

class Game extends Component {
  state = {
    questions: [],
    questionIndex: 0,
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const badResponseCode = 3;
    if (!token) history.push('/');
    const questions = await fetchQuestions(token);
    if (questions.response_code === badResponseCode) history.push('/');
    this.setState({ questions: questions.results });
  };

  render() {
    const { questions, questionIndex } = this.state;

    if (questions.length === 0) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    const alternatives = [
      ...questions[questionIndex].incorrect_answers,
      questions[questionIndex].correct_answer,
    ];

    const question = questions[questionIndex];

    for (let index = (alternatives.length - 1); index > 0; index -= 1) {
      const j = Math.floor(Math.random() * (index + 1));
      const temp = alternatives[index];
      alternatives[index] = alternatives[j];
      alternatives[j] = temp;
    }

    let incorrectIndex = 0;
    return (
      <>
        <Header />
        <main>
          <section>
            <h2
              data-testid="question-category"
            >
              { question.category }
            </h2>
            {
              parse(
                `<p data-testid="question-text">${question.question}</p>`,
              )
            }
          </section>
          <section data-testid="answer-options">
            {
              alternatives.map((alternative) => {
                if (question.incorrect_answers.includes(alternative)) {
                  incorrectIndex += 1;
                  return (
                    <button
                      key={ alternative }
                      data-testid={ `wrong-answer-${incorrectIndex - 1}` }
                    >
                      { alternative }
                    </button>
                  );
                }
                return (
                  <button
                    key={ alternative }
                    data-testid="correct-answer"
                  >
                    { alternative }
                  </button>
                );
              })
            }
          </section>
        </main>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
