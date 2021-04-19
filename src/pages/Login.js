import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loggedInAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: {
        email: '',
        password: '',
      },
      isDisabled: true,
      loggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    const minPasswordLength = 6;
    this.setState((prevState) => ({
      userInput: { ...prevState.userInput, [name]: value },
    }), () => {
      const { userInput: { email, password } } = this.state;
      if ((email.length > 0)
        && (password.length > 0)
        && (/\S+@\S+\.\S+/.test(email))
        && (password.length >= minPasswordLength)) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { userInput: { email } } = this.state;
    const { getEmail } = this.props;
    getEmail(email);
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    const { userInput: { email, password }, loggedIn, isDisabled } = this.state;
    return (
      <div className="login-page-container">
        <form className="login-form">
          <h1>Login Page</h1>
          <div className="login-container">
            <label htmlFor="user-email">
              Login
              <input
                type="email"
                id="user-email"
                placeholder="email@email.com"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="email-input"
              />
            </label>
          </div>
          <div className="password-container">
            <label htmlFor="user-password">
              Senha
              <input
                type="password"
                id="user-password"
                placeholder="Senha"
                name="password"
                value={ password }
                onChange={ this.handleChange }
                data-testid="password-input"
              />
            </label>
          </div>
          <button type="submit" onClick={ this.handleClick } disabled={ isDisabled }>
            Entrar
          </button>
        </form>
        { (loggedIn) && <Redirect to="/carteira" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(loggedInAction(email)),
});

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
