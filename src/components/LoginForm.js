import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { login } from '../actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.checkFormats = this.checkFormats.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { email: '', password: '' };
  }

  checkFormats() {
    const { email, password } = this.state;
    const emailFormat = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
    const passwordFormat = /[\w\D]{6}/g.test(password);
    return emailFormat && passwordFormat;
  }

  handleChange({ target }) {
    const { type, value } = target;
    this.setState({ [type]: value });
  }

  handleSubmit() {
    const { submit } = this.props;
    const { email } = this.state;
    submit(email);
  }

  render() {
    return (
      <form>
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
        <Link to="/carteira">
          <button
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ !this.checkFormats() }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = { submit: func.isRequired };

const mapDispatchToProps = (dispatch) => ({ submit: (email) => dispatch(login(email)) });

export default connect(null, mapDispatchToProps)(LoginForm);
