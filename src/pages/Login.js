import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import login from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.checkFormats = this.checkFormats.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { email: props, password: '', redirect: false };
  }

  checkEmail(email) { return /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email); }

  checkPassword(password) { return /[\w\D]{6}/g.test(password); }

  checkFormats() {
    const { email, password } = this.state;
    return this.checkEmail(email) && this.checkPassword(password);
  }

  handleChange({ target }) {
    const { type, value } = target;
    this.setState({ [type]: value });
  }

  handleSubmit() {
    const { submit } = this.props;
    const { email } = this.state;
    submit(email);
    this.setState(({ redirect: true }));
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          onChange={ this.handleChange }
          required
        />
        <input
          data-testid="password-input"
          type="password"
          onChange={ this.handleChange }
          required
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
          disabled={ !this.checkFormats() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ email: state.user.email });
const mapDispatchToProps = (dispatch) => ({ submit: (email) => dispatch(login(email)) });
export default connect(mapStateToProps, mapDispatchToProps)(Login);
