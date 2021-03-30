import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disableBtn: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleLogin();
    });
  }

  validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  handleLogin() {
    const { email, password } = this.state;
    const passwordMin = 6;
    const { emailDispatch } = this.props;
    if (this.validateEmail(email) && password.length >= passwordMin) {
      this.setState({
        disableBtn: false,
      });
      emailDispatch(email);
    } else {
      this.setState({
        disableBtn: true,
      });
    }
  }

  render() {
    const { email, password, disableBtn } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          placeholder="Informe seu email"
          autoComplete="off"
        />
        <input
          data-testid="password-input"
          type="text"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          placeholder="Informe sua senha"
          autoComplete="off"
        />
        <Link to="/carteira">
          <button type="button" disabled={ disableBtn }>Entrar</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = {
  emailDispatch: userAction,
};

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
