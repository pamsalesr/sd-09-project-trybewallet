import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import saveEmailAction from '../actions/saveEmail';

class Login extends React.Component {
  constructor() {
    super();

    this.handleInputs = this.handleInputs.bind(this);
    this.validation = this.validation.bind(this);

    this.state = {
      email: '',
      password: '',
      validation: true,
    };
  }

  validation() {
    const { email, password } = this.state;
    const passwordConditional = 6;
    const regex = /[a-zA-Z0-9\-_.]+@[a-zA-Z0-9]+.[a-z]+$/gm.test(email);

    if (regex && password.length >= passwordConditional) {
      this.setState({ validation: false });
    } else {
      this.setState({ validation: true });
    }
  }

  handleInputs({ target }) {
    this.setState(() => ({
      [target.name]: target.value,
    }), () => this.validation());
  }

  render() {
    const { saveEmail } = this.props;
    const { validation, email } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          onChange={ (event) => this.handleInputs(event) }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ (event) => this.handleInputs(event) }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ validation }
            onClick={ () => saveEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => {
    dispatch(saveEmailAction(email));
  },
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
