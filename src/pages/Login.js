import { Component } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    gravatarEmail: '',
    userName: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { gravatarEmail, userName } = this.state;
    return (
      <main>
        <form>
          <input
            type="email"
            name="gravatarEmail"
            placeholder="Qual é o e-mail do seu gravatar?"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="userName"
            placeholder="Qual seu nome?"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ userName.length < 1
              || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(gravatarEmail) }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
          >
            <BsFillGearFill />
            Configurações
          </button>
        </form>
      </main>
    );
  }
}

export default connect()(Login);
