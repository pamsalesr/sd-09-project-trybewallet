import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdAccountCircle } from 'react-icons/md';

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      authorizedLogin: false,
      showAlert: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(user) {
    const { email, password } = this.state;
    console.log('email: ', email, 'password: ', password);
    console.log('click!');
    if (email === user.email && password === user.password) {
      this.setState({ authorizedLogin: true });
    } else {
      this.setState({ showAlert: true });
    }
  }

  render() {
    const { user } = this.props;
    const { email, password, authorizedLogin, showAlert } = this.state;
    const alert = (<p>Email ou Senha incorretos!</p>);
    return (
      <div className="container-login">
        <form className="form-login" action="">
          <MdAccountCircle size={ 80 } />
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleInputChange }
            placeholder="E-mail"
            pattern="^\w*(\.\w*)?@\w*\.[a-z]+(\.[a-z]+)?$"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleInputChange }
            placeholder="Senha"
            minLength="6"
            data-testid="password-input"
            required
          />
          <button
            className="btn-login"
            type="button"
            onClick={ () => this.handleClick(user) }
          >
            Entrar
          </button>
        </form>
        {authorizedLogin && <Redirect to="/carteira" />}
        {showAlert && alert}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Login);
