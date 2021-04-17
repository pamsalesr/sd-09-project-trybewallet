import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailInsert, passwordInsert } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      email: '',
      password: '',
      passwordOk: false,
      emailOk: false,
    };

    this.inputEmail = this.inputEmail.bind(this);
    this.inputPassword = this.inputPassword.bind(this);
    this.buttonLoguin = this.buttonLoguin.bind(this);
    this.clickButtonLoguin = this.clickButtonLoguin.bind(this);
    this.testEmailPassword = this.testEmailPassword.bind(this);
  }

  async testEmailPassword(event) {
    // const {dispatchEmail, dispatchPassword} = this.props;
    const { type } = event.target;
    const { emailOk, passwordOk } = this.state;
    const inutil = 5;
    let email1 = '';
    let password1 = '';

    switch (type) {
    case 'email':
      email1 = event.target.value;
      if (email1.includes('@') && email1.includes('.com')) {
        this.setState({
          email: email1,
          emailOk: true,
        });
      } else {
        this.setState({
          emailOk: false,
        });
      }
      break;
    case 'password':
      password1 = event.target.value;
      if (password1.length >= inutil) {
        this.setState({
          password: password1,
          passwordOk: true,
        });
      } else {
        this.setState({
          passwordOk: false,
        });
      }
      break;
    default:
      break;
    }
    if (passwordOk === true && emailOk === true) {
      this.setState({ disabled: false });
      // dispatchEmail(this.state.email);
      // dispatchPassword(this.state.password);
    } else {
      this.setState({ disabled: true });
    }
  }

  clickButtonLoguin() {
    const { email, password } = this.state;
    const { dispatchEmail, dispatchPassword } = this.props;
    dispatchEmail(email);
    dispatchPassword(password);
    // window.location.href = '/carteira';
  }

  inputEmail() {
    return (
      <div>
        <input
          id="input-email"
          type="email"
          data-testid="email-input"
          onChange={ this.testEmailPassword }
        />
      </div>
    );
  }

  inputPassword() {
    return (
      <div>
        <input
          id="input-password"
          type="password"
          data-testid="password-input"
          onChange={ this.testEmailPassword }
        />
      </div>
    );
  }

  buttonLoguin() {
    const { disabled } = this.state;
    return (
      <div>
        <Link to="/carteira">
          <button
            type="button"
            onClick={ this.clickButtonLoguin }
            id="buttom-loguin"
            disabled={ disabled }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.inputEmail() }
        { this.inputPassword() }
        { this.buttonLoguin() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(emailInsert(email)),
  dispatchPassword: (password) => dispatch(passwordInsert(password)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func,
  dispatchPassword: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
