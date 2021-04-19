import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import userLogin, { getMoneyInfo } from '../actions/index';

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

  componentDidMount() {
    const { moneyInfo } = this.props;
    moneyInfo();
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
    const { goToWallet } = this.props;
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
        <Link to="/carteira">
          <button
            type="button"
            disabled={ eValid || pwValid }
            onClick={ () => {
              goToWallet(email);
            } }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  goToWallet: PropTypes.func.isRequired,
  moneyInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  moneyInfo: () => dispatch(getMoneyInfo()),
  goToWallet: (email) => dispatch(userLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
