import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      isLoggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    () => {
      this.verifyInputs();
    });
  }

  verifyInputs() {
    const { email, password } = this.state;
    const emailRegex = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const passwordLength = 6;
    const isValid = email.match(emailRegex) && password.length >= passwordLength;
    if (isValid) this.setState({ isDisabled: false });
    if (!isValid) this.setState({ isDisabled: true });
  }

  handleClick() {
    const { email } = this.state;
    const { sendEmail } = this.props;
    sendEmail(email);
    this.setState({
      isLoggedIn: true,
    });
  }

  render() {
    const { email, password, isDisabled, isLoggedIn } = this.state;
    return (
      <main>
        {isLoggedIn && <Redirect to="/carteira" />}
        <div className="login-container">
          <h1>Trybe Wallet</h1>
          <h3>Por favor, faça o login.</h3>
          <label htmlFor="email-input">
            Email:
            <input
              type="text"
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
              id="email-input"
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              type="text"
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
              id="password-input"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(loginEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
