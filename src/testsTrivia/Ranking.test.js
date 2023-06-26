import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Ranking from '../pages/Ranking';
import store from '../redux/store';

describe('Testa a página de Ranking', () => {
  test('Verifica se o título está renderizado corretamente', () => {
    render(
      <Provider store={ store }>
        <Ranking history={ createMemoryHistory() } />
      </Provider>,
    );

    const title = screen.getByTestId('ranking-title');
    expect(title).toHaveTextContent('Ranking');
  });

  test('Verifica se está renderizado o botão "Novo Jogo"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Provider store={ store }>
          <Ranking history={ history } />
        </Provider>
      </Router>,
    );

    const button = screen.getByTestId('btn-go-home');
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/');
  });
});
