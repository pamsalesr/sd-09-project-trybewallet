import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';
import Proptypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };
    this.submitLogin = this.submitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const min = 6;
      if (regex.test(email) && password.length >= min) {
        this.setState({ disableButton: false });
      } else this.setState({ disableButton: true });
    });
  }

  submitLogin() {
    const { email, password } = this.state;
    console.log(`Login: ${email} senha: ${password}`);
    this.setState({ email: '', password: '', disableButton: true });
  }

  render() {
    const { email, disableButton } = this.state;
    const { submit } = this.props;
    return (
      <div>
        <div><h1>TrybeWallet</h1></div>
        <input
          data-testid="email-input"
          type="text"
          placeholder="e-mail"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="password"
          name="password"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disableButton }
            onClick={ () => submit(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: (email) => dispatch(login(email)) });

Login.propTypes = {
  submit: Proptypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
