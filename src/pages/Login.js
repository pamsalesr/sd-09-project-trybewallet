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
      loginValidation: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  validateLogin() {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.com$/i;
    const passwordMinLength = 6;
    let validate = false;

    if (emailRegex.test(email) && password.length >= passwordMinLength) validate = true;

    this.setState({
      loginValidation: validate,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validateLogin());
  }

  render() {
    const { email, password, loginValidation } = this.state;
    const { dispatchLogin } = this.props;

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
            disabled={ !loginValidation }
            onClick={ () => dispatchLogin(email) }
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
