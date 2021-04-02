import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.emailValidator = this.emailValidator.bind(this);
    this.passwordValidator = this.passwordValidator.bind(this);
    this.submitValidator = this.submitValidator.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { history, sendEmail } = this.props;
    const { email } = this.state;
    console.log(email);
    console.log(this.submitValidator());
    if (this.submitValidator()) {
      sendEmail(email);
      history.push('/carteira');
      // * Source https://github.com/tryber/sd-09-project-trybewallet/pull/7/files
    }
  }

  emailValidator(email) {
    const validator = email.match(/^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/);
    if (validator !== null) {
      return true;
    }
  }

  passwordValidator(password) {
    const minimumPasswordLength = 6;
    if (password.length >= minimumPasswordLength) {
      return true;
    }
  }

  submitValidator() {
    const { email, password } = this.state;
    if (this.emailValidator(email) && this.passwordValidator(password)) {
      return true;
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="email-input"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              id="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(userLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
