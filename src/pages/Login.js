import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { onSubmitLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      isDisable: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { login, password } = this.state;
    this.setState({
      [name]: value,
    });
    const minPassword = 4;
    const regexToVerify = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // Aprendi esse regex com o video desse link -> https://www.youtube.com/watch?v=HzJngc-Se9Q
    if (login.match(regexToVerify) && password.length > minPassword) {
      this.setState(() => ({ isDisable: false }));
    } else {
      this.setState(() => ({ isDisable: true }));
    }
  }

  render() {
    const { login, password, isDisable, redirect } = this.state;
    const { onSubmit } = this.props;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <input
          type="text"
          placeholder="Login"
          data-testid="email-input"
          name="login"
          value={ login }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ () => {
            onSubmit(login);
            this.setState({ redirect: true });
          } }
          disabled={ isDisable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispathToProps = (dispatch) => ({
  onSubmit: (state) => dispatch(onSubmitLogin(state)),
});

export default connect(null, mapDispathToProps)(Login);
