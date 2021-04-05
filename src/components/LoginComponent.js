import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { emailAction } from '../actions';
import logoTrybe from '../logoTrybe.png';

class LoginComponent extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.dispatchEmail = this.dispatchEmail.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  isValidEmail() {
    const { email, password } = this.state;
    const six = 6; // Mas que raios é esse magic number!!
    const testValidation = /[a-z|0-9|._]*@[a-z|0-9]*[.][a-z]/;
    return !(email.match(testValidation) && password.length >= six);
    // if (email.match(testValidation) && password.length >= six) {
    //   this.setState({
    //     disableBtn: false,
    //   });
    // } else {
    //   this.setState({
    //     disableBtn: true,
    //   });
    // }
  }

  dispatchEmail() {
    const { sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
  }

  render() {
    return (
      <>
        <img src={ logoTrybe } alt="Logo da Trybe" />

        <input
          data-testid="email-input"
          name="email"
          type="text"
          placeholder="Digite seu e-mail"
          onChange={ this.handleChange }
        />

        <input
          data-testid="password-input"
          name="password"
          type="password"
          onChange={ this.handleChange }
        />

        <Link to="/carteira">
          <button
            type="button"
            disabled={ this.isValidEmail() }
            onClick={ this.dispatchEmail }
          >
            Entrar
          </button>
        </Link>
      </>
    );
  }
}

LoginComponent.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(emailAction(email)),
});

export default connect(null, mapDispatchToProps)(LoginComponent);
