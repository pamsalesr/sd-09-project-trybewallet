import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      auth: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { loginDispatch } = this.props;
    return (
      <section id="Login">
        <h2 className="secondary-heading">Login</h2>
        <div className="login-box">
          <form>
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="Email"
              data-testid="email-input"
            />
            <input
              type="password"
              onChange={ this.handleChange }
              placeholder="Password"
              data-testid="password-input"
            />
            <button type="submit" onClick={ loginDispatch(this.state) }>Entrar</button>
          </form>
        </div>
      </section>
    );
  }
}
Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (state) => dispatch(authLogin(state)) });
export default connect(null, mapDispatchToProps)(Login);
