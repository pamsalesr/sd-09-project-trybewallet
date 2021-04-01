import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin } from '../actions';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailValidated: false,
      passWordValidated: false,
    };

    this.handlerEmail = this.handlerEmail.bind(this);
    this.handlerPassWord = this.handlerPassWord.bind(this);
  }

  handlerEmail({ target: { value } }) {
    const regex = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const isvalid = regex.test(value);

    this.setState({
      email: value,
      emailValidated: isvalid,
    });
  }

  handlerPassWord({ target: { value } }) {
    const password = value.split('').length;
    const minCaracter = 6;
    let isValid = false;

    if (password >= minCaracter) {
      isValid = true;
    }

    this.setState({
      passWordValidated: isValid,
    });
  }

  render() {
    const { dispatchEmail } = this.props;
    const { email, emailValidated, passWordValidated } = this.state;
    const buttonIsDisabled = !(emailValidated && passWordValidated);

    return (
      <div className="login">
        <section className="login-input">
          <img src="../logo.svg" alt="Icone do aplicativo" />
          <input
            type="text"
            data-testid="email-input"
            onChange={ this.handlerEmail }
            placeholder="Login"
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handlerPassWord }
            placeholder="Senha"
          />
          <Link to="/carteira">
            <button
              id="login-button"
              type="button"
              onClick={ () => dispatchEmail(email) }
              disabled={ buttonIsDisabled }
            >
              Entrar
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchEmail: PropTypes.func,
};

Login.defaultProps = {
  dispatchEmail: PropTypes.func,
};

const mapDispathToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(userLogin(email)),
});

export default connect(null, mapDispathToProps)(Login);
