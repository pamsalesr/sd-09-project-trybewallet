import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdAccountCircle } from 'react-icons/md';

import saveUserData from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      authorizedLogin: false,
      enabledBtn: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    //const { email, password } = this.state;
    const validLogin = this.validateLogin();

    if (validLogin) {
      this.setState({ enabledBtn: true });
    } else {
      this.setState({ enabledBtn: false });
    }
  }

  /* handleInputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    const { password } = this.state;
    const minLength = 6;
    const validPassword = password.length >= minLength;
    const validEmail = this.validateEmail();

    if (validEmail && validPassword) {
      this.setState({ enabledBtn: true });
    } else {
      this.setState({ enabledBtn: false });
    }
  } */

  /**
   * Consulta realizada no Forum da Alura, em como validar email.
   * Link: https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469
   */
  /* validateEmail() {
    const { email } = this.state;
    const rgex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return rgex.test(email);
  } */
  validateLogin() {
    const { email, password } = this.state;
    const rgex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const validEmail = rgex.test(email);

    const minLength = 5;
    const validPassword = password.length > minLength;
    console.log('password:', password, 'password-lenght:', password.length);

    if (validEmail && validPassword) {
      // console.log('email:', validEmail, 'password:', validPassword);
      return true;
    }
    // console.log('email:', validEmail, 'password:', validPassword);
    return false;
  }

  handleClick(setUserData) {
    const { email, password } = this.state;
    /* const minLength = 6;
    const validPassword = password.length >= minLength;
    const validEmail = this.validateEmail(); */

    // if (validEmail && validPassword) {
      this.setState({ authorizedLogin: true });
      setUserData({ email, password });
    /* } else {
      this.setState({ showAlert: true });
    } */
  }

  render() {
    const { setUserData } = this.props;
    const { email, password, authorizedLogin, enabledBtn } = this.state;
    console.log('render:', password);
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
            pattern="^\w*(\.\w*)?@\w*\.[a-z]+(\.[a-z]+)?$"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleInputChange }
            placeholder="Senha"
            minLength="6"
            data-testid="password-input"
            required
          />
          {enabledBtn
            ? enableButton
            : <button className="btn-login" type="button" disabled>Entrar</button>
          }
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
