import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
    this.saveRanking();
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
    this.saveRanking();
  };

  saveRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { email, name, score } = this.props;
    const hash = MD5(email).toString();
    const photo = `https://www.gravatar.com/avatar/${hash}`;
    if (!ranking) {
      localStorage
        .setItem('ranking', JSON.stringify([{ score, photo, name }]));
    } else {
      localStorage
        .setItem('ranking', JSON.stringify([...ranking, { score, photo, name }]));
    }
  };

  render() {
    const { assertions, score } = this.props;
    const points = 3;

    return (
      <main>
        <div>
          <Header />
          <p data-testid="feedback-text">
            {
              assertions < points ? 'Could be better...' : 'Well Done!'
            }
          </p>
          <p>
            Você acertou
            <span data-testid="feedback-total-question">
              { ' ' }
              {assertions}
              { ' ' }
            </span>
            { assertions === 1 ? 'questão.' : `questões${assertions === 0 ? '.' : '!'}`}
          </p>
          <p>
            Um total de
            <span
              data-testid="feedback-total-score"
            >
              { ' ' }
              { score }
              { ' ' }
            </span>
            pontos.
          </p>
        </div>
        <button
          onClick={ this.handleClickPlayAgain }
          data-testid="btn-play-again"
        >
          Novo jogo

        </button>
        <button
          onClick={ this.handleClickRanking }
          data-testid="btn-ranking"
        >
          Ranking

        </button>

      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape(PropTypes.object.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Feedback);
