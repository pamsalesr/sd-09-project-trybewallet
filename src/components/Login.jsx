import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userRegister } from '../actions';
import '../App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      allow: true,
    };
    this.stateVerifier = this.stateVerifier.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.stateVerifier());
  }

  handleClick(email) {
    const { addUser } = this.props;
    addUser(email);
  }

  stateVerifier() {
    const { email, password } = this.state;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const passwordRegex = new RegExp(/[\w\D]{6}/g);
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      this.setState({ allow: false });
    } else {
      this.setState({ allow: true });
    }
  }

  render() {
    const { allow, email } = this.state;
    return (
      <div className="login-forms">
        <h1>Trybe Wallet</h1>
        <input
          type="email"
          name="email"
          placeholder="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.handleChange }
          required
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => this.handleClick(email) }
            disabled={ allow }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(userRegister(email)),
});

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
