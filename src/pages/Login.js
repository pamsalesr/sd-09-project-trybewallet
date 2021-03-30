import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setUserEmail as setUserEmailAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleClick() {
    const { email } = this.state;
    const { setUserEmail } = this.props;
    setUserEmail(email);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  emailValidation() {
    const { email, password } = this.state;
    let disabled = true;
    const emailValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const minLength = 6;
    disabled = !(emailValid.test(email) && password.length >= minLength);
    this.setState({ disabled });
  }

  render() {
    const { disabled, email, password } = this.state;
    const { handleChange, handleClick, emailValidation } = this;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              name="email"
              type="email"
              data-testid="email-input"
              value={ email }
              onChange={ (event) => handleChange(event) }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              name="password"
              type="password"
              data-testid="password-input"
              value={ password }
              onChange={ (event) => handleChange(event) }
              onKeyUp={ () => emailValidation() }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => handleClick() }
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
  setUserEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (email) => dispatch(setUserEmailAction(email)),
});

// const mapStateToProps = (state) => ({
//   userState: state.user.state,
// });

export default connect(null, mapDispatchToProps)(Login);
