import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { email, password } = this.state;

    this.setState(({
      [name]: value,
    }));

    const emailRE = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const passwordRE = new RegExp(/[\w\D]{5}/g);

    if (emailRE.test(email)
      && passwordRE.test(password)) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { email, password, disabled } = this.state;
    const { userActionFunc } = this.props;

    return (
      <div>
        <div className="form-login">
          <label htmlFor="email">
            Email
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => userActionFunc(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userActionFunc: (email) => dispatch(userAction(email)),
});

Login.propTypes = {
  userActionFunc: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
