import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveUserEmail } from '../../actions';

class LoginInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginWallet: false,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputs({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    const { email } = this.state;
    const { saveUserPropEmail } = this.props;
    saveUserPropEmail(email);
    this.setState({
      loginWallet: true,
    });
    event.preventDefault();
  }

  handleValidateEmail(value) {
    // return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value));
    return (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(value));
  }

  handleValidatePassword(value, number) {
    return (value.length >= number);
  }

  handleValidateBtn(number, pattern) {
    const { email, password } = this.state;
    return (this.handleValidateEmail(email, pattern)
    && this.handleValidatePassword(password, number));
  }

  render() {
    const { email, password, loginWallet } = this.state;
    const minLengthPassword = 6;
    if (loginWallet) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <div>
          <span>E-mail: </span>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleInputs }
          />
        </div>
        <div>
          <span>Senha : </span>
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            // minLength="6"
            onChange={ this.handleInputs }
          />
        </div>
        <button
          type="submit"
          // Prop "pattern" abaixo tirado do site:
          // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_email_pattern
          // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
          onClick={ this.handleClick }
          disabled={ !this.handleValidateBtn(minLengthPassword, this.pattern) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

LoginInput.propTypes = {
  saveUserPropEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserPropEmail: (email) => dispatch(saveUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(LoginInput);
