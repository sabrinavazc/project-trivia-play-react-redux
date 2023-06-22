import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsFillGearFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { actionUser } from '../redux/actions';
import { getToken } from '../helpers/fetchTrivia';
import style from './Login.module.css';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const { token } = await getToken();
    localStorage.setItem('token', token);
    dispatch(actionUser({ email, name }));
    history.push('/game');
  };

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    return (
      <main className={ style.main }>
        <header className={ style.header }>
          <div className={ style.questions }>
            <span className={ style.question1 }>?</span>
            <span className={ style.question2 }>?</span>
            <span className={ style.question3 }>?</span>
          </div>
          <h1 className={ style.h1 }>Trivia</h1>
        </header>
        <div className={ style.triangle } />
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
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <button
            className={ `${style.button} ${style.config}` }
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            <BsFillGearFill className={ style.gear } />
            Configurações
          </button>
        </form>
      </main>
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
