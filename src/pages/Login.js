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
    getEmail(email);
    if (this.validate()) history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <input
          placeholder="Insert your E-mail"
          name="email"
          type="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          placeholder="Insert Password"
          name="password"
          type="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          onClick={ this.clickHandler }
          disabled={ !this.validate() }
        >
          Entrar
        </button>
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
