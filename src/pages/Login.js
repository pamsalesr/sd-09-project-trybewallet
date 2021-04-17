import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import userLogin, { sendMoneyInfo } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pwd: '',
      eValid: true,
      pwValid: true,
    };

    this.validate = this.validate.bind(this);
  }

  validate(e) {
    const { type, value } = e.target;
    const five = 5;
    if (type === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const validEmail = re.test(value);
      this.setState({
        eValid: !validEmail,
        email: value,
      });
    }
    if (type === 'password') {
      this.setState({
        pwValid: value.length <= five,
        pwd: value,
      });
    }
  }

  render() {
    const { email, pwd, eValid, pwValid } = this.state;
    const { goToWallet, getMoneyInfo } = this.props;
    return (
      <div id="login-div">
        <h2>Faça login</h2>
        <form>
          <input
            onChange={ this.validate }
            type="email"
            data-testid="email-input"
            value={ email }
          />
          <input
            onChange={ this.validate }
            type="password"
            data-testid="password-input"
            value={ pwd }
          />
        </form>
        <br />
        <button
          type="button"
          disabled={ eValid || pwValid }
          onClick={ () => {
            goToWallet(email);
            getMoneyInfo();
            window.location = '/carteira';
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  goToWallet: PropTypes.func.isRequired,
  getMoneyInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getMoneyInfo: () => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((result) => {
        const keys = Object.keys(result);
        const allKeys = keys.filter((coin) => coin !== 'USDT');
        const allMoney = allKeys.map((key) => result[key]);
        console.log(allMoney);
        dispatch(sendMoneyInfo(allMoney));
      });
  },
  goToWallet: (email) => {
    console.log(email);
    dispatch(userLogin(email));
  },
});

export default connect(null, mapDispatchToProps)(Login);
