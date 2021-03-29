import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { addUser } from '../actions';
import '../Styles/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.validInputs = this.validInputs.bind(this);
    this.handleEmail = this.handleEmail.bind(this);

    this.state = {
      email: '',
      disabled: true,
    };
  }

  handleEmail({ target: { value } }) {
    this.setState({ email: value });
  }

  validInputs({ target: { value } }) {
    const { email } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (regex.test(email) && value.length >= '6') {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { email, disabled } = this.state;
    const { saveEmail } = this.props;
    saveEmail(email);
    return (
      <div className="login-page">
        <div className="login-container">
          <h1>Trybe Wallet</h1>
          <input
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            name="email"
            onChange={ this.handleEmail }
            required
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            name="password"
            onChange={ this.validInputs }
            required
          />
          <Link to="/carteira" className="link-enter">
            <button type="button" disabled={ disabled }>
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispacth) => ({
  saveEmail: (email) => dispacth(addUser(email)),
});

Login.propTypes = {
  saveEmail: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
