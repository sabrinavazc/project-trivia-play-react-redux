import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import 'jest-localstorage-mock';
import App from '../App';
import renderWithRouterAndRedux from '../tests/helpers/renderWithRouterAndRedux';

const fakeToken = {
  response_code: 0,
  response_message: 'Token Generated Successfully!',
  token: 'cbe265ecd1484db0daac4fbd5a829c6decfbb5d7fc044d18a43e91de5030936e',
};

function mockFetch() {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(fakeToken),
  });
}
describe('Testa component Login', () => {
  const userInfos = ['teste@email.com', 'TriviaUser'];

  it('Renderiza corretamente os campos do formulário e a rota é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;

    expect(screen.getByTestId(/input-gravatar-email/i)).toBeVisible();
    expect(screen.getByTestId(/input-player-name/i)).toBeVisible();
    expect(screen.getByTestId('btn-play')).toBeVisible();
    expect(screen.getByTestId('btn-settings')).toBeVisible();
    expect(pathname).toBe('/');
  });

  it('O botão de jogar só é habilitado quando os campos são preenchidos', () => {
    const [email, name] = userInfos;
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/input-gravatar-email/i);
    const nameInput = screen.getByTestId(/input-player-name/i);
    const playButton = screen.getByTestId('btn-play');

    act(() => {
      userEvent.type(emailInput, email);
    });
    expect(playButton).toBeDisabled();
    act(() => {
      userEvent.clear(emailInput);
      userEvent.type(nameInput, name);
    });
    expect(playButton).toBeDisabled();
    act(() => {
      userEvent.type(emailInput, email);
    });
    expect(playButton).toBeEnabled();
  });

  it('Redireciona para "/settings" quando clica no botão de configurações', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByTestId('btn-settings');
    act(() => {
      userEvent.click(settingsButton);
    });

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/settings');
    });
  });

  it(
    'No clique no botão de jogar o fetch é chamado e o token é guardado no localStorage',
    async () => {
      mockFetch();
      const [email, name] = userInfos;

      renderWithRouterAndRedux(<App />);

      const emailInput = screen.getByTestId(/input-gravatar-email/i);
      const nameInput = screen.getByTestId(/input-player-name/i);
      const playButton = screen.getByTestId('btn-play');

      act(() => {
        userEvent.type(emailInput, email);
        userEvent.type(nameInput, name);
        userEvent.click(playButton);
      });

      const { token } = fakeToken;

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
      });
    },
  );

  it('Email e nome são salvos no estado global após clicar em Jogar', async () => {
    mockFetch();
    const [userEmail, userName] = userInfos;

    const { store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(/input-gravatar-email/i);
    const nameInput = screen.getByTestId(/input-player-name/i);
    const playButton = screen.getByTestId('btn-play');

    act(() => {
      userEvent.type(emailInput, userEmail);
      userEvent.type(nameInput, userName);
      userEvent.click(playButton);
    });

    await waitFor(() => {
      const { player: { email, name } } = store.getState();
      expect(email).toBe(userEmail);
      expect(name).toBe(userName);
    });
  });

  it('Após clicar no botão de Jogar é redirecionado para a rota "/game"', async () => {
    mockFetch();
    const [email, name] = userInfos;

    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(/input-gravatar-email/i);
    const nameInput = screen.getByTestId(/input-player-name/i);
    const playButton = screen.getByTestId('btn-play');

    act(() => {
      userEvent.type(emailInput, email);
      userEvent.type(nameInput, name);
      userEvent.click(playButton);
    });

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/game');
    });
  });
});
