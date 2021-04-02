import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from '../actions';
import logo from '../logo.svg';
import '../App.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validInputs: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => this.validate());
  }

  handleLogin() {
    const { email } = this.state;
    const { emailToStore } = this.props;
    emailToStore(email);
  }

  validate() {
    const { email, password } = this.state;
    const minPasswordLength = 6;
    const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g');
    const validEmail = regex.test(email);
    const validPassword = password.length >= minPasswordLength;
    this.setState({ validInputs: validEmail && validPassword });
  }

  render() {
    const { email, password, validInputs } = this.state;
    return (
      <div className="App">
        <form className="login">
          <img src={ logo } alt="Trybe logo" width="36px" className="App" />
          <h1>TrybeWallet</h1>
          <input
            name="email"
            type="text"
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            name="password"
            type="password"
            placeholder="senha"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
          />
          <Link to="/carteira" className="link">
            <button
              className="send-button"
              type="submit"
              disabled={ !validInputs }
              onClick={ (evt) => this.handleLogin(evt) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  emailToStore: PropTypes.func.isRequired,
};

const dispatchEvent = (dispatch) => ({
  emailToStore: (email) => dispatch(Actions(email)),
});

export default connect(null, dispatchEvent)(Login);
