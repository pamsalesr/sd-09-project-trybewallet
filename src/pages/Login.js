import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import loginAction from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    // this.validFields = this.validFields.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { loginAction: login } = this.props;
    const { email, password } = this.state;
    const minCaracters = 6;
    const disabled = true;
    const regexEmail = /\S+@\S+\.\S+/;
    const passwordValid = password.length >= minCaracters;
    return (
      <section>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          value={ password }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ regexEmail.test(email) && passwordValid ? !disabled : disabled }
            onClick={ () => login(email) }
          >
            Entrar
          </button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = {
  loginAction,
};

Login.propTypes = {
  loginAction: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
