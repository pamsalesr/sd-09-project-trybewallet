import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveLoginInformation } from '../actions';

class Login extends React.Component {
  render() {
    const { email, userDispatch } = this.props;
    return (
      <div className="login-div">
        <input
          data-testid="email-input"
          name="email"
          onChange={ ({ target }) => userDispatch(target.value) }
          placeholder="alguem@email.com"
          type="email"
          value={ email }
          required
        />
        <input
          data-testid="password-input"
          minLength="6"
          type="password"
          required
        />
        <Link to="/carteira">
          <button
            disabled={ false }
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
  userDispatch: ((email) => dispatch(saveLoginInformation(email))),
});

Login.propTypes = {
  email: PropTypes.string.isRequired,
  userDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
