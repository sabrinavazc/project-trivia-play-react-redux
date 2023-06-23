import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  handleClickHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <title data-testid="ranking-title">Ranking</title>
        <p>Ranking</p>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClickHome }
        >
          Novo Jogo
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(PropTypes.object.isRequired).isRequired,
};

export default connect()(Ranking);
