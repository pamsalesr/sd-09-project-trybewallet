import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(email) {
    const { dispatchLogin } = this.props;
    dispatchLogin(email);
    this.setState({ email: '', redirect: true });
  }

  render() {
    const { email, redirect } = this.state;
    if (redirect) return <Redirect push to="/carteira" />;

    return (
      <div>
        <h1>Faça seu Login</h1>
        <label htmlFor="email">
          Insira seu email:
          <input
            data-testid="email-input"
            type="email"
            placeholder="alguem@alguem.com"
            id="email"
            maxLength="30"
            value={ email }
            name="email"
            required
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Informe sua senha:
          <input
            data-testid="password-input"
            type="password"
            minLength="6"
            id="password"
            name="password"
            required
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ () => this.handleClick(email) }
        >
          Entrar
        </button>

      </div>);
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
