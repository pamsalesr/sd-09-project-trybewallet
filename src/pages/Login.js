import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.addValue = this.addValue.bind(this);
    this.validation = this.validation.bind(this);
    this.enabledButton = this.enabledButton.bind(this);
    this.redirect = this.redirect.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.state = {
      redirect: false,
      email: '',
      senha: '',
    }
  }

  componentDidMount () {
    this.disabledButton();
  }

  validation() {
    const { senha, email } = this.state;
    if (email === "alguem@email.com" && senha.length >= 5) {
      this.enabledButton();
    }
    else {
      this.disabledButton();
    }
  }

  enabledButton() {
    document.getElementById("value").disabled = false;
  }

  disabledButton() {
    document.getElementById("value").disabled = true;
  }

  redirect() {
    const { keyAddemail } = this.props;
    const { email } = this.state;
    keyAddemail(email);
    this.setState({ redirect: true })
  }

  addValue(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />
    return(
      <div onChange={ this.validation }>
        <label>
          E-mail:
          <input name="email" data-testid="email-input" onChange={ this.addValue } />
        </label>
        <label>
          Senha:
          <input name="senha" data-testid="password-input" onChange={ this.addValue } />
        </label>
        <button id="value" onClick={ this.redirect }>Entrar</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  keyAddemail: (email) => (dispatch(addEmail(email)))
})

export default connect(null, mapDispatchToProps)(Login);
