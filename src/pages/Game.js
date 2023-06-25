import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import Header from '../components/Header';
import fetchQuestions from '../helpers/fetchQuestions';
import Loading from '../components/Loading';
import style from './Game.module.css';
import { updateScore } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    isCorrect: false,
    isDisabled: false,
    timeRemaining: 0,
  };

  componentDidMount() {
    this.getQuestions();
    this.interval = 30000;
    this.start = Date.now();
    this.timer = setTimeout(() => {
      this.setState({ isDisabled: true });
    }, this.interval);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onAlternativeBtnClick = (alternative) => {
    const msConverter = 1000;
    clearTimeout(this.timer);
    const elapsed = Date.now() - this.start;
    const remainingMs = this.interval - elapsed;
    const timeRemaining = Math.floor(remainingMs / msConverter);
    this.setState({ isCorrect: true, timeRemaining }, () => {
      this.callUpdateScore(alternative);
    });
  };

  callUpdateScore = (alternative) => {
    const { questions, questionIndex, timeRemaining } = this.state;
    const { dispatch } = this.props;
    const { difficulty } = questions[questionIndex];
    const baseScore = 10;
    const levels = { easy: 1, medium: 2, hard: 3 };
    if (alternative === questions[questionIndex].correct_answer) {
      const finalScore = (baseScore + (timeRemaining * levels[difficulty]));
      dispatch(updateScore(finalScore));
    }
  };

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

  render() {
    const { questions, questionIndex, isCorrect, isDisabled } = this.state;

    if (questions.length === 0) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    const question = questions[questionIndex];
    const { alternatives } = question;

    let incorrectIndex = 0;
    const letters = ['A', 'B', 'C', 'D'];
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
          <section
            data-testid="answer-options"
            className={ style.alternatives }
          >
            {
              alternatives.map((alternative, index) => {
                if (question.incorrect_answers.includes(alternative)) {
                  incorrectIndex += 1;
                  return (
                    <>
                      <span
                        key={ letters[index] + alternative }
                        className={ style.letters }
                      >
                        { letters[index] }
                      </span>
                      <button
                        key={ alternative }
                        type="button"
                        data-testid={ `wrong-answer-${incorrectIndex - 1}` }
                        className={ `${style.buttons} ${isCorrect && style.incorrect}` }
                        onClick={ () => this.onAlternativeBtnClick(alternative) }
                        disabled={ isDisabled }
                      >
                        { parse(`${alternative}`) }
                      </button>
                    </>
                  );
                }
                return (
                  <>
                    <span
                      key={ letters[index] + alternative }
                      className={ style.letters }
                    >
                      { letters[index] }
                    </span>
                    <button
                      key={ alternative }
                      type="button"
                      data-testid="correct-answer"
                      className={ `${style.buttons} ${isCorrect && style.correct}` }
                      onClick={ () => this.onAlternativeBtnClick(alternative) }
                      disabled={ isDisabled }
                    >
                      { parse(`${alternative}`) }
                    </button>
                  </>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
