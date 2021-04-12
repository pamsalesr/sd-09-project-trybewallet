import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  savesUserEmail as savesUserEmailAction
} from '../actions';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.userDataValidation = this.userDataValidation.bind(this);
    this.dispatchEmail = this.dispatchEmail.bind(this);

    this.state = {
      userEmail: '',
      userPassword: '',
      isDisabled: true,
    };
  }

  dispatchEmail() {
    const { userEmail } = this.state;
    const { savesUserEmail } = this.props;
    savesUserEmail(userEmail);
  }

  userDataValidation() {
    const { userEmail, userPassword } = this.state;
    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const minLength = 6;
    let disabled = !(emailValidation.test(userEmail) && userPassword.length >= minLength);
    this.setState({
      isDisabled: disabled,
    });
  }

  handleChange({target}) {
    const { userDataValidation } = this;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    userDataValidation();
  }

  render() {
    const { handleChange, dispatchEmail } = this;
    const { userEmail, userPassword, isDisabled } = this.state;
    return(
      <section name="login">
        <input
          data-testid="email-input"
          type="email"
          name="userEmail"
          placeholder="E-mail"
          value={userEmail}
          onChange={(e) => handleChange(e)}
        />
        <input
          data-testid="password-input"
          type="password"
          name="userPassword"
          placeholder="Senha"
          value={userPassword}
          onChange={(e) => handleChange(e)}
        />
        <Link to="/carteira">
          <button
            disabled={isDisabled}
            onClick={() => dispatchEmail()}
          >
            Entrar
          </button>
        </Link>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  savesUserEmail: (userData) => (dispatch(savesUserEmailAction(userData)))
});

export default connect(null, mapDispatchToProps)(Login);
