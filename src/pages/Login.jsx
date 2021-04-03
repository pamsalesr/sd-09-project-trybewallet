import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      disableButton: true,
    };
    this.handleUserInputs = this.handleUserInputs.bind(this);
    this.isValidEmailAndPassword = this.isValidEmailAndPassword.bind(this);
  }

  handleUserInputs({ name, value }) {
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    this.isValidEmailAndPassword();
  }

  isValidEmailAndPassword() {
    const { userEmail, userPassword } = this.state;
    const regexEmailValidation = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const isValidEmail = regexEmailValidation.test(userEmail);
    const regexPasswordValidation = /[\S]{5,}/;
    const isValidPassword = regexPasswordValidation.test(userPassword);
    this.setState((state) => ({
      ...state,
      disableButton: !isValidEmail || !isValidPassword,
    }));
  }

  render() {
    const { disableButton, userEmail } = this.state;
    const { emailDispatcher } = this.props;
    return (
      <form>
        <fieldset>
          <label htmlFor="user-email-input">
            Email:
            <input
              id="user-email-input"
              data-testid="email-input"
              type="email"
              name="userEmail"
              // value={ userEmail }
              onChange={ ({ target }) => this.handleUserInputs(target) }
            />
          </label>

          <label htmlFor="user-password-input">
            Senha:
            <input
              id="user-password-input"
              data-testid="password-input"
              type="password"
              name="userPassword"
              // value={ userPassword }
              onChange={ ({ target }) => this.handleUserInputs(target) }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disableButton }
              onClick={ () => emailDispatcher(userEmail) }
            >
              Entrar
            </button>
          </Link>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  emailDispatcher: (email) => dispatch(handleEmail(email)),
});

Login.propTypes = {
  emailDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
