import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validationFields = this.validationFields.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.state = { validEmail: false, password: false, email: '' };
  }

  validationFields(event) {
    const minLengthPassword = 6;
    const re = /\S+@\S+\.\S+/;
    const { value, id } = event.target;
    if (id === 'email') {
      if (re.test(value)) {
        this.setState({
          validEmail: true,
          email: value,
        });
      } else {
        this.setState({
          validEmail: false,
        });
      }
    }
    if (id === 'pw') {
      if (value.length >= minLengthPassword) {
        this.setState({
          password: true,
        });
      } else {
        this.setState({
          password: false,
        });
      }
    }
  }

  saveEmail() {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(email);
  }

  render() {
    const { validEmail, password } = this.state;
    let isValid = false;
    if (validEmail && password) {
      isValid = true;
    }
    return (
      <div>
        <label htmlFor="email">
          <span>Email: </span>
          <input
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ this.validationFields }
          />
        </label>
        <label htmlFor="pw">
          <span>Senha: </span>
          <input
            type="password"
            id="pw"
            data-testid="password-input"
            onChange={ this.validationFields }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !isValid }
            onClick={ this.saveEmail }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
