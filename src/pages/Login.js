import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signin } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.isEmail = this.isEmail.bind(this);
    this.isPassword = this.isPassword.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateStatus = this.updateStatus.bind(this);

    this.state = {
      email: '',
      password: '',
      disable: true,
    };
  }

  componentDidUpdate() {
    const { email, password, disable } = this.state;
    if (disable) {
      if (this.isEmail(email) && this.isPassword(password)) {
        return this.updateStatus(false);
      }
    } else if (!this.isEmail(email) || !this.isPassword(password)) {
      return this.updateStatus(true);
    }
  }

  updateStatus(bool) {
    this.setState((state) => ({ ...state, disable: bool }));
  }

  isEmail(email) {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isPassword(password) {
    const MAX = 6;
    if (password.length >= MAX) return true;
    return false;
  }

  updateState(event) {
    const { name, value } = event.target;
    this.setState((state) => ({ ...state, [name]: value }));
  }

  render() {
    const { disable, email } = this.state;
    const { signIn } = this.props;
    return (
      <div className="container-center">
        <div className="wrapper-login">
          <h1>SIGNIN</h1>
          <input
            name="email"
            type="text"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.updateState }
          />
          <input
            name="password"
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.updateState }
          />
          <Link to="/carteira">
            <button
              disabled={ disable }
              onClick={ () => signIn(email) }
              type="button"
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signIn: (value) => dispatch(signin(value)),
});

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
