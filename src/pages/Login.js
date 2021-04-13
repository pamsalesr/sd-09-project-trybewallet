import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonEnabled: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validateFields);
  }

  validateFields() {
    const { email, password } = this.state;
    // /[\S]{6,}/;
    const passwordMin = 5;
    const mailCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    this.setState({
      buttonEnabled: mailCheck.test(email) && password.length > passwordMin,
    });
  }

  handleClick() {
    const { email, password } = this.state;
    const { dispatchMail } = this.props;
    const state = {
      email,
      password,
    };
    localStorage.setItem('state', JSON.stringify(state));

    dispatchMail(email);
    const { history: { push } } = this.props;
    push('/carteira');
  }

  render() {
    const { email, password, buttonEnabled } = this.state;
    return (
      <div>
        Login
        <label htmlFor="input">
          E-mail
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input">
          Senha
          <input
            type="text"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <Link to={ { pathname: '/carteira' } }>
          <button
            type="button"
            disabled={ !buttonEnabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchMail: (email) => dispatch(setEmail(email)) });

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchMail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
