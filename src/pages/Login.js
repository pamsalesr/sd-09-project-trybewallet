import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';
import './Login.css';
import Footer from './Footer';
import Header from './Header';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.checked = this.checked.bind(this);
    this.eventClick = this.eventClick.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // Logica by RodrigoCamargo
  eventClick() {
    const { history, getEmail } = this.props;
    const { email } = this.state;
    getEmail(email);
    if (this.checked()) history.push('/carteira');
  }

  verifyEmail(email) {
    const valid = email.match(/^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/);
    return valid != null;
  }

  verifyPassword(password) {
    const minimumCharacter = 6;
    return password.length >= minimumCharacter;
  }

  checked() {
    const { email, password } = this.state;
    return this.verifyEmail(email) && this.verifyPassword(password);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-body">
        <Header />
        <div className="forms-div">
          <div className="login-page">
            <label htmlFor="user-email">
              E-mail:
              <input
                placeholder="Digite seu email"
                data-testid="email-input"
                id="email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="user-password">
              Senha:
              <input
                placeholder="Digite sua senha"
                data-testid="password-input"
                id="password"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              onClick={ this.eventClick }
              disabled={ !this.checked() }
            >
              Entrar
            </button>
          </div>
        </div>
        <Footer />
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
  getEmail: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
