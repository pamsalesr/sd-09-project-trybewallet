import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  checkMail(email) {
    const emailRegex = /^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/;
    return emailRegex.test(email);
  }

  checkPassword(password) {
    const min = 6;
    if (password.length >= min) {
      return true;
    }
  }

  validate() {
    const { password, email } = this.state;
    return this.checkPassword(password) && this.checkMail(email);
  }

  clickHandler() {
    const { history, getEmail } = this.props;
    const { email } = this.state;
    const timer = 2100;
    getEmail(email);
    if (this.validate()) setTimeout(() => history.push('/carteira'), timer);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="backgroundLogin">
        <div className="login">
          <div className="loginBox teste">
            <div className="inputContainer teste">
              <input
                className="email"
                placeholder="Insert your E-mail"
                name="email"
                type="email"
                value={ email }
                data-testid="email-input"
                onChange={ this.handleChange }
              />
              <input
                className="password"
                placeholder="Insert Password"
                name="password"
                type="password"
                value={ password }
                data-testid="password-input"
                onChange={ this.handleChange }
              />
              <button
                className="btn"
                type="button"
                onClick={ this.clickHandler }
                disabled={ !this.validate() }
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(setEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
