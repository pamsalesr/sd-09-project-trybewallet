import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/index';
import Form from '../components/form';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passWord: '',
      desableButton: false,
      logIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fieldChecker = this.fieldChecker.bind(this);
    // this.authenticateLogin = this.authenticateLogin.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  async fieldChecker() {
    const { email, passWord } = this.state;
    const { emailOfLogin } = this.props;
    const minimalCaractersForPassWord = 6;
    const minimalCaractersForEmail = 10;

    if (passWord < minimalCaractersForPassWord) {
      (this.setState({
        passWordError: true,
      }));
    } else {
      (this.setState({
        passWordError: false,
      }));
    }

    if (email.length < minimalCaractersForEmail) {
      (this.setState({
        emailError: true,
      }));
    } else {
      (this.setState({
        emailError: false,
        logIn: true,
      }));
    }
    emailOfLogin(email);
  }

  render() {
    const { emailError, passWordError, desableButton, logIn } = this.state;
    // const messagePassWordError = <p>A senha deve conter ao menos 6 caracteres</p>;
    // const messageEmailError = <p>Digite um e-mail válido</p>;
    const logInWallet = <Redirect push to="/carteira" />;
    return (
      <div>
        <h1>Jhon Wallet</h1>
        <Form
          handleChange={ this.handleChange }
          fieldChecker={ this.fieldChecker }
          desableButton={ desableButton }
        />
        { (logIn) ? logInWallet : '' }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailOfLogin: (state) => dispatch(login(state)),
});

Login.propTypes = {
  emailOfLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
