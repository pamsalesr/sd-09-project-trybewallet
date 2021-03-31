import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setUserEmail from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  handleClick() {
    const { history, setEmail } = this.props;
    const { email } = this.state;
    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const patternEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const patternPassword = /[\w\D]{6}/g;
    return (
      <div>
        Login
        <form>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ (event) => this.handleChange(event) }
            pattern={ patternEmail }
            required
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ (event) => this.handleChange(event) }
            pattern={ patternPassword }
            required
          />
          <input
            type="submit"
            value="Entrar"
            onClick={ this.handleClick }
            disabled={ !((patternEmail.test(email)) && (patternPassword.test(password))) }
            // https://www.w3schools.com/jsref/jsref_regexp_test.asp
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (user) => dispatch(setUserEmail(user)),
});

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
