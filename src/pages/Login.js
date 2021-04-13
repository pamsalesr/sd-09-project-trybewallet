import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveLoginInfo } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      valid: {
        email: false,
        password: false,
      },
      redirect: false,
    };
  }

  onChange(event) {
    const SIX = 6;
    const { target: { name, value }, target } = event;
    const { valid } = this.state;
    const validValue = (name === 'email') ? target.checkValidity() : value.length >= SIX;
    this.setState({
      [name]: value,
      valid: {
        ...valid,
        [name]: validValue,
      },
    });
  }

  onSubmit(event) {
    const { email, password } = this.state;
    const { saveInfo } = this.props;
    event.preventDefault();
    saveInfo({ email, password });
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, redirect, valid } = this.state;
    return ((!redirect)
      ? (
        <form onSubmit={ this.onSubmit.bind(this) }>
          <label htmlFor="email">
            Digite seu email
            <input
              name="email"
              id="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.onChange.bind(this) }
              type="email"
              required
            />
          </label>
          <label htmlFor="password">
            Digite sua senha
            <input
              name="password"
              id="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.onChange.bind(this) }
              type="password"
              minLength={ 6 }
              required
            />
          </label>
          <button
            type="submit"
            disabled={ !valid.email || !valid.password }
          >
            Entrar
          </button>
        </form>
      )
      : <Redirect to="/carteira" />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (data) => dispatch(saveLoginInfo(data)),
});

Login.propTypes = {
  saveInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
