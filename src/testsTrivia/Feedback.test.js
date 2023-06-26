import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import Feedback from '../pages/Feedback';
import store from '../redux/store';

describe('Testa a página de Feedback', () => {
  test('Verifica se o texto de feedback está renderizado corretamente', () => {
    render(
      <Provider store={ store }>
        <Feedback
          assertions={ 3 }
          score={ 10 }
          name="John Doe"
          email="john@example.com"
        />
      </Provider>,
    );

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Could be better...');
  });

  test('Verifica se o botão de novo jogo está renderizado corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Feedback
          assertions={ 3 }
          score={ 10 }
          name="John Doe"
          email="john@example.com"
          history={ history }
        />
      </Provider>,
    );

    const playAgainButton = screen.getByTestId('btn-play-again');
    fireEvent.click(playAgainButton);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se o botão ranking está renderizado corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Feedback
          assertions={ 3 }
          score={ 10 }
          name="John Doe"
          email="john@example.com"
          history={ history }
        />
      </Provider>,
    );

    const rankingButton = screen.getByTestId('btn-ranking');
    fireEvent.click(rankingButton);
    expect(history.location.pathname).toBe('/ranking');
  });
});
