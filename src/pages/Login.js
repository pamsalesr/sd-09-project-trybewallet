import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import img from '../logoTrybe.png';
import { LoginContainer, Img, Input, Button } from './LoginStyled';
import userEmail from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonState: true,
    };

    this.isValidEmail = this.isValidEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange({ target }) {
    const { name, value } = target;
    await this.setState({ [name]: value });
    this.isValidEmail();
  }

  isValidEmail() {
    const { email, password } = this.state;
    const six = 6;
    const testValidation = /[a-z|0-9|._]*@[a-z|0-9]*[.][a-z]/;
    if (email.match(testValidation) && password.length >= six) {
      this.setState({
        buttonState: false,
      });
    } else {
      this.setState({
        buttonState: true,
      });
    }
  }

  render() {
    const { email, buttonState } = this.state;
    const { dispatchEmail } = this.props;
    return (
      <LoginContainer>
        <Img src={ img } alt="Logo da Trybe" />

        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
          onChange={ this.handleChange }
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ this.handleChange }
          required
        />

        <Link to="/carteira" className="link" onClick={ () => dispatchEmail(email) }>
          <Button
            type="button"
            // onClick={ () => dispatchEmail(email) }
            disabled={ buttonState }
          >
            Entrar
          </Button>
        </Link>

      </LoginContainer>
    );
  }
}

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(userEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
