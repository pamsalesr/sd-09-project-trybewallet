import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Actions from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.buttonSend = this.buttonSend.bind(this);
    this.validadeEmail = this.validadeEmail.bind(this);
  }

  validadeEmail(email) {
    const providerLenth = 4;
    const array = email.split('@');
    let returnValue = false;

    if (email.length < 1) {
      return returnValue;
    }

    if (array.length === 2 && array[0].length > 0 && array[0].length > providerLenth
      && array[1].endsWith('.com')) {
      returnValue = true;
    }

    return returnValue;
  }

  handleChangeEmail({ target }) {
    const { addUser, user } = this.props;
    const { password, button, shouldRedirect } = user;
    const { value } = target;
    const passLength = 6;
    let buttonState = button;

    if (password.length >= passLength && this.validadeEmail(value)) {
      buttonState = false;
    } else {
      buttonState = true;
    }

    addUser(value, password, buttonState, shouldRedirect);
  }

  handleChangePassword({ target }) {
    const { addUser, user } = this.props;
    const { email, button, shouldRedirect } = user;
    const { value } = target;
    const passLength = 6;
    let buttonState = button;

    if (value.length >= passLength && this.validadeEmail(email)) {
      buttonState = false;
    } else {
      buttonState = true;
    }

    addUser(email, value, buttonState, shouldRedirect);
  }

  buttonSend() {
    const { addUser, user } = this.props;
    const { email, password, button } = user;

    addUser(email, password, button, true);
  }

  render() {
    const { user } = this.props;
    const { email, password, button, shouldRedirect } = user;

    if (shouldRedirect) {
      return (
        <Redirect to="/carteira" />
      );
    }

    return (
      <div className="login-form">
        <div className="login-email">
          <input
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ this.handleChangeEmail }
          />
        </div>
        <div className="login-password">
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ this.handleChangePassword }
          />
        </div>
        <div className="login-button">
          <button
            type="button"
            disabled={ button }
            onClick={ this.buttonSend }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    button: PropTypes.bool,
    shouldRedirect: PropTypes.bool,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (email, password, button, shouldRedirect) => (
    dispatch(Actions.addUser(email, password, button, shouldRedirect))),

});

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
