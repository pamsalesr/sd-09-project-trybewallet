import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';
import '../Styles/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.validEmail = this.validEmail.bind(this);
    this.validPassword = this.validPassword.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateStatus = this.updateStatus.bind(this);

    this.state = {
      email: '',
      password: '',
      status: true,
    };
  }

  componentDidUpdate() {
    const { email, password, status } = this.state;
    if (status) {
      if (this.validEmail(email) && this.validPassword(password)) {
        return this.updateStatus(false);
      }
    } else if (!this.validEmail(email) || !this.validPassword(password)) {
      return this.updateStatus(true);
    }
  }

  updateStatus(bool) {
    this.setState((state) => ({ ...state, status: bool }));
  }

  validEmail(email) {
    const one = 1;
    const five = 5;
    let user = '';
    let final = '';
    if (email.includes('@') && email.includes('.com')) {
      user = (email.slice(0, email.indexOf('@')));
      final = (email.slice(email.indexOf('@') + one));
    }
    if (user.length >= one && final.length >= five) return true;
    return false;
  }

  validPassword(password) {
    const six = 6;
    if (password.length >= six) return true;
    return false;
  }

  updateState(event) {
    const { name, value } = event.target;
    this.setState((state) => ({ ...state, [name]: value }));
  }

  render() {
    const { status, email } = this.state;
    const { saveMail } = this.props;
    return (
      <div className="container-login">
        <h1>Login</h1>
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
            disabled={ status }
            onClick={ () => saveMail(email) }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveMail: (value) => dispatch(saveEmail(value)),
});

Login.propTypes = {
  saveMail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
