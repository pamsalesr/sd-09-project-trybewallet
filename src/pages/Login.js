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
    };
    this.changeInput = this.changeInput.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  changeInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  submitUser() {
    const { dispatchUser } = this.props;
    dispatchUser(this.state);
  }

  render() {
    const { email } = this.state;
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
              name="userPassword"
              placeholder="password"
              type="password"
              data-testid="password-input"
            />
          </label>
        </div>
        { email
        && (
          <div>
            <Link to="/carteira">
              <button
                type="button"
                onClick={ () => this.submitUser() }
              >
                Entrar
              </button>
            </Link>
          </div>) }
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
