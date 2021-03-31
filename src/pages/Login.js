import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import addEmail from '../actions/actionLogin';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailDigitado: '',
      senha: '',
      redirect: false,
      bloqueado: true,
    };
    this.setRedirect = this.setRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validaLogin = this.validaLogin.bind(this);
  }

  setRedirect() {
    const { emailDigitado } = this.state;
    const { email } = this.props;
    this.setState({ redirect: true });
    email(emailDigitado);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validaLogin();
  }

  validaLogin() {
    const { emailDigitado, senha } = this.state;
    const numero = 4;
    const formato = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    if (formato.test(emailDigitado) && senha.length > numero) {
      this.setState({ bloqueado: false });
    } else {
      this.setState({ bloqueado: true });
    }
  }

  render() {
    const { emailDigitado, senha, redirect, bloqueado } = this.state;
    return (
      <div>
        <input
          type="email"
          name="emailDigitado"
          value={ emailDigitado }
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="senha"
          value={ senha }
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ () => this.setRedirect() }
          disabled={ bloqueado }
        >
          Entrar
        </button>
        { redirect ? <Redirect to="/carteira" /> : '' }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  email: (e) => dispatch(addEmail(e)),
});

Login.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

