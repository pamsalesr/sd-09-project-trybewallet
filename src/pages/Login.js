import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdAccountCircle } from 'react-icons/md';

import { saveUserData } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      authorizedLogin: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick(setUserData) {
    const { email, password } = this.state;
    setUserData({ email, password });
    this.setState({ authorizedLogin: true });
  }

  render() {
    const { setUserData } = this.props;
    const { email, password, authorizedLogin } = this.state;
    const validateLogin = () => {
      const rgex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
      const validEmail = rgex.test(email);
      const minlength = 6;
      const validPassword = password.length >= minlength;
      return (validEmail && validPassword);
    };
    const enableButton = (
      <button
        className="btn-login"
        type="button"
        onClick={ () => this.handleClick(setUserData) }
      >
        Entrar
      </button>
    );
    return (
      <div className="container-login">
        <form className="form-login" action="">
          <MdAccountCircle size={ 80 } />
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleInputChange }
            placeholder="E-mail"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleInputChange }
            placeholder="Senha"
            data-testid="password-input"
            required
          />
          {validateLogin()
            ? enableButton
            : <button className="btn-login" type="button" disabled>Entrar</button>}
        </form>
        {authorizedLogin && <Redirect to="/carteira" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserData: (user) => dispatch(saveUserData(user)),
});

Login.propTypes = {
  setUserData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
