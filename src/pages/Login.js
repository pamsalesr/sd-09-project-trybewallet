import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      disable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifier = this.verifier.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.verifier());
  }

  handleClick(email) {
    const { dispatchLogin } = this.props;
    dispatchLogin(email);
    this.setState({ email: '', redirect: true });
  }

  verifier() {
    const { email, password } = this.state;
    const emailVerifier = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const passwordVerifier = /[\w\D]{6}/g;
    if (emailVerifier.test(email) && passwordVerifier.test(password)) {
      this.setState({ disable: false });
      console.log(typeof password);
    } else {
      this.setState({ disable: true });
    }
  }

  render() {
    const { email, redirect, disable } = this.state;
    if (redirect) return <Redirect push to="/carteira" />;

    return (
      <div>
        <h1>Faça seu Login</h1>
        <label htmlFor="email">
          Insira seu email:
          <input
            data-testid="email-input"
            type="email"
            placeholder="alguem@alguem.com"
            id="email"
            value={ email }
            name="email"
            required
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Informe sua senha:
          <input
            data-testid="password-input"
            type="password"
            minLength="6"
            id="password"
            name="password"
            required
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ () => this.handleClick(email) }
          disabled={ disable }
        >
          Entrar
        </button>

      </div>);
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
