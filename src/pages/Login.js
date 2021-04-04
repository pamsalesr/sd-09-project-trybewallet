import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validations: {
        email: false,
        password: false,
      },
    };
    this.updateState = this.updateState.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.toggleBtn = this.toggleBtn.bind(this);
  }

  updateState(name, value, bool) {
    this.setState((state) => ({
      ...state,
      [name]: value,
      validations: {
        ...state.validations,
        [name]: bool,
      },
    }));
  }

  toggleBtn() {
    const { validations: { email, password } } = this.state;
    if (email && password) {
      return (<button id="login-btn" type="button">Entrar</button>);
    }
    return (<button id="login-btn" type="button" disabled>Entrar</button>);
  }

  validateFields({ target }) {
    const { name, value } = target;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid;
    const passwordMinLength = 6;
    switch (name) {
    case 'email':
      isValid = value.match(regex);
      return isValid
        ? this.updateState(name, value, true) : this.updateState(name, value, false);
    case 'password':
      return value.length >= passwordMinLength
        ? this.updateState(name, value, true) : this.updateState(name, value, false);
    default:
      break;
    }
  }

  render() {
    const { login } = this.props;
    const { email } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="text"
            data-testid="email-input"
            onChange={ this.validateFields }
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha:
          <input
            name="password"
            type="text"
            data-testid="password-input"
            onChange={ this.validateFields }
          />
        </label>
        <br />
        <Link to="/carteira" onClick={ () => login(email) }>
          { this.toggleBtn() }
        </Link>
      </form>);
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
