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
      desableButton: true,
      logIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fieldChecker = this.fieldChecker.bind(this);
    this.logInWallet = this.logInWallet.bind(this);
  }

  // Verificação de email consultada no Stack OverFlow, vide:
  // https://pt.stackoverflow.com/questions/72617/validar-email-em-javascript
  verifyEmail(email) {
    const regexVerify = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
    if (regexVerify.test(email)) {
      return true;
    }
    return false;
  }

  fieldChecker() {
    const { email, passWord } = this.state;
    const minimumPassWordLength = 5;
    if ((this.verifyEmail(email)) && (passWord.length > minimumPassWordLength)) {
      this.setState({
        desableButton: false,
      });
    } else {
      this.setState({
        desableButton: true,
      });
    }
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    },
    () => {
      this.fieldChecker();
    });
  }

  logInWallet() {
    const { email } = this.state;
    const { emailOfLogin } = this.props;

    emailOfLogin(email);
    this.setState({
      logIn: true,
    });
  }

  render() {
    const { desableButton, logIn } = this.state;
    const redirect = <Redirect push to="/carteira" />;
    return (
      <div>
        <h1>Jhon Wallet</h1>
        <Form
          handleChange={ this.handleChange }
          logInWallet={ this.logInWallet }
          desableButton={ desableButton }
        />
        { (logIn) ? redirect : '' }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailOfLogin: (email) => dispatch(login(email)),
});

Login.propTypes = {
  emailOfLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
