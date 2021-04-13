import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      disableBtn: true,
    };
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleLogin();
    });
  }

  handleLogin() {
    const { email, password } = this.state;
    const passwordMin = 6;
    if (this.validateEmail(email) && password.length >= passwordMin) {
      this.setState({
        disableBtn: false,
      });
    } else {
      this.setState({
        disableBtn: true,
      });
    }
  }

  render() {
    const { disableBtn, email } = this.state;
    const { dispatchEmail } = this.props;
    return (
      <div>
        <label htmlFor="email-input">
          Email
          <input
            data-testid="email-input"
            id="email-input"
            name="email"
            type="email"
            onChange={ this.handleChange }
          />
        </label>
        Senha
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            id="password-input"
            name="password"
            type="password"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disableBtn }
            onClick={ () => dispatchEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
