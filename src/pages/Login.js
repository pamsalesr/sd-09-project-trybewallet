import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logUserIn } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: String(),
      password: String(),
      disabled: true,
    };
    this.changeInput = this.changeInput.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  validateUser({ email, password }) {
    this.setState({
      disabled: true,
    });
    const emailValidation = new RegExp(/^[\w\d]+@[\w]+\.[\w]{2,3}/g);
    const passwordValidation = new RegExp(/^.{6,}/g);
    if (emailValidation.test(email) && passwordValidation.test(password)) {
      this.setState({
        disabled: false,
      });
    }
  }

  changeInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validateUser(this.state));
  }

  submitUser() {
    const { dispatchUser } = this.props;
    dispatchUser(this.state);
  }

  render() {
    const { email, disabled, password } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="userLogin">
            <input
              name="email"
              value={ email }
              placeholder="email"
              type="text"
              data-testid="email-input"
              onChange={ this.changeInput }
            />
          </label>
        </div>

        <div>
          <label htmlFor="userPassword">
            <input
              name="password"
              value={ password }
              placeholder="password"
              type="password"
              data-testid="password-input"
              onChange={ this.changeInput }
            />
          </label>
        </div>
        <div>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => this.submitUser() }
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
  dispatchUser: (email) => dispatch(logUserIn(email)),
});

Login.propTypes = {
  dispatchUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
