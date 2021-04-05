import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { actionUser } from '../store/actions';

const minPasswordLength = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isEmailValid = this.isEmailValid.bind(this);
  }

  componentDidUpdate() {
    this.isEmailValid();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  isEmailValid() {
    const { email } = this.state;
    if (email.includes('@') && email.includes('.com')) {
      return true;
    }
    return false;
  }

  isPasswordValid() {
    const { password } = this.state;
    if (password.length >= minPasswordLength) {
      return true;
    }
    return false;
  }

  checkLoginAvailable() {
    if (this.isEmailValid() && this.isPasswordValid()) {
      return true;
    }
    return false;
  }

  render() {
    const { email, password } = this.state;
    const { addEmail } = this.props;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          name="email"
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          name="password"
          value={ password }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !(this.checkLoginAvailable()) }
            onClick={ () => addEmail(email) }
          >
            Entrar

          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(actionUser(email)),
});

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
