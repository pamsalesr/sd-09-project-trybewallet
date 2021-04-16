import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addEmailState } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  // Executando função após atualização do state
  // https://stackoverflow.com/questions/34687091/can-i-execute-a-function-after-setstate-is-finished-updating
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateForm());
  }

  // Validação de E-mail por Regex
  // https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
  validateForm() {
    const { email, password } = this.state;
    const regexEmail = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    const sizePassword = 5;

    if (regexEmail.test(email) && password.length > sizePassword) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { email, password, disabled } = this.state;
    const { addEmailStateDispatcher } = this.props;

    return (
      <div className="container-login">
        <h1>TrybeWallet</h1>
        <form>
          <label htmlFor="email-input">
            <input
              type="text"
              name="email"
              id="email-input"
              data-testid="email-input"
              placeholder="Digite seu email"
              required
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              name="password"
              id="password-input"
              data-testid="password-input"
              placeholder="Digite sua senha"
              required
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => addEmailStateDispatcher(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  addEmailStateDispatcher: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addEmailStateDispatcher: (email) => dispatch(addEmailState(email)),
});

export default connect(null, mapDispatchToProps)(Login);
