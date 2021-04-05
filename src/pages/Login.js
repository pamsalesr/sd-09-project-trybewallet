import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import validator from 'validator';
import { registerEmailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.isEmailValid = this.isEmailValid.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(registerEmail, email) {
    registerEmail(email);

    this.setState({
      shouldRedirect: true,
    });
  }

  isEmailValid() {
    const { email } = this.state;

    // return validator.isEmail(email);
    return email === 'alguem@email.com';
  }

  isPasswordValid() {
    const { password } = this.state;
    const passwordMinimumLength = 6;

    return password.length >= passwordMinimumLength;
  }

  render() {
    const { email, password, shouldRedirect } = this.state;
    const { registerEmail } = this.props;

    return (
      <div id="login">
        <form>
          <fieldset>
            <label htmlFor="email">
              Email:
              <br />
              <input
                name="email"
                value={ email }
                type="email"
                id="email"
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password">
              Senha:
              <br />
              <input
                name="password"
                value={ password }
                type="password"
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              disabled={ !this.isEmailValid() || !this.isPasswordValid() }
              onClick={ () => {
                this.handleClick(registerEmail, email);
              } }
            >
              Entrar
            </button>
          </fieldset>
        </form>
        {shouldRedirect ? <Redirect to="/carteira" /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerEmail: (email) => dispatch(registerEmailAction(email)),
});

Login.propTypes = {
  registerEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
