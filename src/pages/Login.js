import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userAction from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.validateFields();
    });
  }

  validateFields() {
    const { email, password } = this.state;
    const PASS_LENGTH = 6;
    const regexCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    this.setState({
      isValid: regexCheck.test(email) && password.length >= PASS_LENGTH,
    });
  }

  handleClick() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
  }

  render() {
    const { email, password, isValid } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email-input">
            E-mail:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="exemplo@exemplo.com"
              id="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password-input">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>

          <Link to="/carteira">
            <button
              type="button"
              disabled={ !isValid }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
