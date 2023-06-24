import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import Header from '../components/Header';
import fetchQuestions from '../helpers/fetchQuestions';
import Loading from '../components/Loading';
import style from './Game.module.css';

class Game extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    isCorrect: false,
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

    const { results } = questions;
    results.forEach((question) => {
      const alternatives = [
        ...question.incorrect_answers,
        question.correct_answer,
      ];

      for (let index = alternatives.length - 1; index > 0; index -= 1) {
        const j = Math.floor(Math.random() * (index + 1));
        const temp = alternatives[index];
        alternatives[index] = alternatives[j];
        alternatives[j] = temp;
      }

      question.alternatives = alternatives;
    });
    this.setState({ questions: results });
  };

  onAlternativeBtnClick = () => {
    this.setState({ isCorrect: true });
  };

  render() {
    const { questions, questionIndex, isCorrect } = this.state;

    if (questions.length === 0) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    const question = questions[questionIndex];
    const { alternatives } = question;

    // const letters = ['A', 'B', 'C', 'D'];
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
          <ul
            data-testid="answer-options"
            className={ style.alternatives }
          >
            {
              alternatives.map((alternative) => {
                if (question.incorrect_answers.includes(alternative)) {
                  incorrectIndex += 1;
                  return (
                    <li
                      key={ alternative }
                      data-testid={ `wrong-answer-${incorrectIndex - 1}` }
                      className={ `${style.li} ${isCorrect && style.incorrect}` }
                    >
                      <button
                        key={ alternative }
                        className={ style.buttons }
                        onClick={ this.onAlternativeBtnClick }
                      >
                        { parse(`${alternative}`) }
                      </button>
                    </li>
                  );
                }
                return (
                  <li
                    key={ alternative }
                    data-testid="correct-answer"
                    className={ `${style.li} ${isCorrect && style.correct}` }
                  >
                    <button
                      key={ alternative }
                      className={ style.buttons }
                      onClick={ this.onAlternativeBtnClick }
                    >
                      { parse(`${alternative}`) }
                    </button>
                  </li>
                );
              })
            }
          </ul>
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
