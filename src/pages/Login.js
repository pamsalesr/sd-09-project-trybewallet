import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  savesUserEmail as savesUserEmailAction,
} from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.userDataValidation = this.userDataValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      userEmail: '',
      userPassword: '',
      isDisabled: true,
    };
  }

  userDataValidation() {
    const { userEmail, userPassword } = this.state;
    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const minLength = 6;
    const disabled = !(emailValidation.test(userEmail)
    && userPassword.length >= minLength);
    this.setState({
      isDisabled: disabled,
    });
  }

  handleClick() {
    const { userEmail } = this.state;
    const { savesUserEmail } = this.props;
    savesUserEmail(userEmail);
  }

  handleChange({ target }) {
    // const { userDataValidation } = this;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    // userDataValidation();
  }

  render() {
    const { handleChange, handleClick, userDataValidation } = this;
    const { userEmail, userPassword, isDisabled } = this.state;
    return (
      <section name="login">
        <input
          data-testid="email-input"
          type="email"
          name="userEmail"
          placeholder="E-mail"
          value={ userEmail }
          onChange={ (e) => handleChange(e) }
        />
        <input
          data-testid="password-input"
          type="password"
          name="userPassword"
          placeholder="Senha"
          value={ userPassword }
          onChange={ (e) => handleChange(e) }
          onKeyUp={ () => userDataValidation() }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => handleClick() }
          >
            Entrar
          </button>
        </Link>
      </section>
    );
  }
}

Login.propTypes = {
  savesUserEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savesUserEmail: (userData) => (dispatch(savesUserEmailAction(userData))),
});

export default connect(null, mapDispatchToProps)(Login);
