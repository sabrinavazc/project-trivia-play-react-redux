import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsFillGearFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { addsPlayer } from '../redux/actions';
import { getToken } from '../helpers/fetchToken';
import Logo from '../components/Logo';
import style from './Login.module.css';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handlePlayClick = async () => {
    const timeOutPlay = 950;
    const { history, dispatch } = this.props;
    const { email, name } = this.state;

    document.querySelector(`.${style.loginWrapper}`).classList.add(style.exit);

    this.timer = setTimeout(() => {
      history.push('/game');
    }, timeOutPlay);

    const { token } = await getToken();
    localStorage.setItem('token', token);
    dispatch(addsPlayer({ email, name }));
  };

  handleSettingsClick = () => {
    const timeOutSettings = 800;
    const { history } = this.props;

    document.querySelector(`.${style.loginWrapper}`).classList.add(style.exit);

    this.timer = setTimeout(() => {
      history.push('/settings');
    }, timeOutSettings);
  };

  render() {
    const { email, name } = this.state;
    return (
      <div className={ style.loginWrapper }>
        <div className={ style.headerWrapper }>
          <Logo />
        </div>
        <main>
          <form className={ style.form }>
            <input
              className={ style.input }
              type="email"
              name="email"
              placeholder="Qual é o e-mail do seu gravatar?"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            <input
              className={ style.input }
              type="text"
              name="name"
              placeholder="Qual seu nome?"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
            <button
              className={ `${style.button} ${style.play}` }
              type="button"
              data-testid="btn-play"
              disabled={ name.length < 1
                || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) }
              onClick={ this.handlePlayClick }
            >
              Jogar
            </button>
            <button
              className={ `${style.button} ${style.config}` }
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleSettingsClick }
            >
              <BsFillGearFill className={ style.gear } />
              Configurações
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
