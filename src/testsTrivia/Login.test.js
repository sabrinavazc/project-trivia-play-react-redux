import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

const emailimput = 'test@examples.com';

describe('Login', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('deve renderizar corretamente os campos do formulário', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/input-gravatar-email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/input-player-name/i)).toBeInTheDocument();
    expect(screen.getByTestId('btn-play')).toBeInTheDocument();
    expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
  });

  it('deve habilitar o botão Jogar quando os campos estão preenchidos', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    );
    const emailInput = screen.getByTestId(/input-gravatar-email/i);
    const nameInput = screen.getByTestId(/input-player-name/i);
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, emailimput);
    userEvent.type(nameInput, 'John Doe');

    expect(playButton).toBeEnabled();
  });

  it('deve desabilitar o botão Jogar quando os campos não estão preenchidos', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    );

    const playButton = screen.getByTestId('btn-play');

    expect(playButton).toBeDisabled();
  });

  it('deve chamar a função de redirecionamento para a página de configurações', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    );

    const settingsButton = screen.getByTestId('btn-settings');
    userEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/settings');
  });

  it('deve limpar os campos de e-mail e nome após o envio bem-sucedido', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    );

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId(/input-player-name/i);
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'test@examsple.com');
    userEvent.type(nameInput, 'John Doe');

    expect(emailInput).toHaveValue('test@examsple.com');
    expect(nameInput).toHaveValue('John Doe');

    userEvent.click(playButton);
  });

  it('deve desabilitar o botão Jogar quando o campo de e-mail está vazio', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    );

    const nameInput = screen.getByTestId('input-player-name');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(nameInput, 'John Doe');

    expect(playButton).toBeDisabled();
  });

  it('deve redirecionar para a página "/game" após o clique no botão Jogar', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={ store }>
        <Router history={ history }>
          <App />
        </Router>
      </Provider>,
    );

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(nameInput, 'John Doe');

    userEvent.click(playButton);

    expect(history.location.pathname).toBe('/');
  });
});
