import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginAction from '../actions/loginAction';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  validateLogin(name, value) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]$/i;
    const passwordMinLenght = 6;

    if (name === 'email' && emailRegex.test(value)) {
      this.setState({
        validEmail: true,
      });
    }

    if (name === 'password' && value.length >= passwordMinLenght) {
      this.setState({
        validPassword: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    this.validateLogin(name, value);
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;
    const { dispatchLogin } = this.props;
    const buttonStatus = validEmail && validPassword;
    return (
      <div>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
          placeholder="e-mail"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          placeholder="senha"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !buttonStatus }
            onClick={ dispatchLogin }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
