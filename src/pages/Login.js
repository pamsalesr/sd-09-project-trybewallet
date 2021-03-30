import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validadePassword = this.validadePassword.bind(this);
  }

  validadePassword(password) {
    const number6 = 6;
    if (password.length >= number6) return true;
    return false;
  }

  validateEmail(value) {
    const isValid = value.match(/^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/);
    if (isValid) return true;
    return false;
  }

  render() {
    const { loginProp } = this.props;
    const { email, password } = this.state;
    return (
      <div className="login">
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="email"
          data-testid="email-input"
          onChange={ (e) => this.setState({ email: e.target.value }) }
        />
        <input
          type="password"
          placeholder="senha"
          data-testid="password-input"
          onChange={ (e) => this.setState({ password: e.target.value }) }
        />
        <Link to="/carteira">
          <button
            backgroundColor="#03A9F4"
            type="button"
            disabled={ !(this.validadePassword(password) && this.validateEmail(email)) }
            onClick={ () => loginProp(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  loginProp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginProp: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
