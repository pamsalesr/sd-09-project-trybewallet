import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUserEmail } from '../actions';
import './Login.css';

import emailIcon from '../images/email_white_24dp.svg';
import lockIcon from '../images/lock_white_24dp.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  handleClick() {
    const { history, setEmail } = this.props;
    const { email } = this.state;
    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const patternEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const patternPassword = /[\w\D]{6}/g;
    return (
      <section className="login-section">
        <h1>Acesse sua conta</h1>
        <form className="login-form">
          <label htmlFor="email">
            <img src={ emailIcon } className="input-image" alt="Email field" />
            <input
              type="email"
              name="email"
              className="data-input"
              data-testid="email-input"
              placeholder="E-mail"
              onChange={ (event) => this.handleChange(event) }
              pattern={ patternEmail }
              required
            />
          </label>
          <label htmlFor="password">
            <img src={ lockIcon } className="input-image" alt="Password field" />
            <input
              type="password"
              name="password"
              className="data-input"
              data-testid="password-input"
              placeholder="Senha"
              onChange={ (event) => this.handleChange(event) }
              pattern={ patternPassword }
              required
            />
          </label>
          <input
            className="login-button"
            type="submit"
            value="Entrar"
            onClick={ this.handleClick }
            disabled={ !((patternEmail.test(email)) && (patternPassword.test(password))) }
            // https://www.w3schools.com/jsref/jsref_regexp_test.asp
          />
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (user) => dispatch(setUserEmail(user)),
});

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
