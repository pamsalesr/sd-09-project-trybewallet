import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../actions';
import wallet from '../images/wallet.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      disableButton: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  validateLogin() {
    const passwordLenght = 6;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const { login, password } = this.state;
    const disableButton = regex.test(login) && password.length >= passwordLenght;
    this.setState({ disableButton });
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value }, () => this.validateLogin());
  }

  render() {
    const { login, password, disableButton } = this.state;
    const { dispatchEmail } = this.props;
    return (
      <div>
        <div>
          <img src={ wallet } alt="wallet project logo" />
        </div>
        <div>
          <input
            type="email"
            id="login"
            onChange={ (event) => this.handleChange(event) }
            value={ login }
            data-testid="email-input"
          />
          <input
            type="password"
            id="password"
            onChange={ (event) => this.handleChange(event) }
            value={ password }
            data-testid="password-input"
          />
          <Link to="/carteira">
            <input
              type="button"
              id="login-button"
              value="Entrar"
              disabled={ !disableButton }
              onClick={ () => dispatchEmail(login) }
            />
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (login) => dispatch(setEmail(login)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
