import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveLoginInformation } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
    this.validateForm();
  }

  validateForm() {
    const { email, password } = this.state;
    const emailValidation = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const emailIsValid = emailValidation.test(email);
    const passwordValidation = /[\S]{5,}/;
    const passwordIsValid = passwordValidation.test(password);
    this.setState((state) => ({
      ...state,
      disabled: !emailIsValid || !passwordIsValid,
    }));
  }
  
  render() {
    const { email, password, disabled } = this.state;
    const { userDispatch } = this.props;
    return (
      <div className="login-div">
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            name="email"
            placeholder="alguem@email.com"
            type="email"
            value={ email }
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            minLength="6"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            required
          />
        </label>
        <Link to="/carteira">
          <button
            disabled={ disabled }
            type="button"
            onClick={ () => userDispatch(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  userDispatch: ((email) => dispatch(saveLoginInformation(email))),
});

Login.propTypes = {
  userDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
