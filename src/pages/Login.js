import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import loginAction from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };

    this.validateInputs = this.validateInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { type, value } = target;
    this.setState({
      [type]: value,
    });
  }

  validateInputs() {
    const { email, password } = this.state;
    const emailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
    const passwordRegex = /[\w\D]{6}/g.test(password);
    return emailRegex && passwordRegex;
  }

  handleSubmit() {
    const { submit } = this.props;
    const { email } = this.state;
    submit(email);
    this.setState(({
      redirect: true,
    }));
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        Login
        <input
          data-testid="email-input"
          type="email"
          placeholder="email"
          required
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="senha"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
          disabled={ !this.validateInputs() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  submit: PropTypes.func.isRequired,
};

const mapDispatchtoProps = (dispatch) => ({
  submit: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchtoProps)(Login);
