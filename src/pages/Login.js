import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveEmail } from '../actions';

const passwordLength = 5;

function validEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.inputValidation();
  }

  inputValidation() {
    const { email, password } = this.state;
    const emailValidation = validEmail(email);

    if (emailValidation && password.length >= passwordLength) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  render() {
    const { dispatchEmail } = this.props;
    const { email, password, disabledButton } = this.state;
    return (
      <div>
        <h1>MY WALLET</h1>
        <input
          name="email"
          value={ email }
          type="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          value={ password }
          type="password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabledButton }
            onClick={ () => dispatchEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

// # export PATH=$HOME/bin:/usr/local/bin:$PATH
