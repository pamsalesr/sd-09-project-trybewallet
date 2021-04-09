import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChanges = this.handleChanges.bind(this);
    this.renderEmail = this.renderEmail.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);

    this.state = {
      email: '',
      password: '',
      verify: true,
    };
  }

  verifyInputs() {
    const { email, password } = this.state;
    // foi usado regex com auxilio de Luis Carlos
    const emailValidated = /^[\S.]+@[a-z]+.\w{2,3}$/g.test(email);
    const passwordValidated = /[0-9a-zA-Z$*&@#]{6}/.test(password);
    if (emailValidated && passwordValidated) {
      this.setState({ verify: false });
    } else {
      this.setState({ verify: true });
    }
  }

  handleChanges(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyInputs());
    // cada mudança de valor no input, ele chama a função verifyInputs
  }

  renderEmail(value) {
    return (
      <div>
        <label htmlFor="email-input">
          Email:
          <input
            id="email-input"
            type="email"
            data-testid="email-input"
            name="email"
            value={ value }
            onChange={ this.handleChanges }
          />
        </label>
      </div>
    );
  }

  renderPassword(value) {
    return (
      <div>
        <label htmlFor="password-input">
          Password:
          <input
            id="password-input"
            type="password"
            data-testid="password-input"
            name="password"
            value={ value }
            onChange={ this.handleChanges }
          />
        </label>
      </div>
    );
  }

  render() {
    const { value, verify, email } = this.state;
    const { addEmail } = this.props;

    return (
      <section>
        <form>
          { this.renderEmail(value) }
          { this.renderPassword(value) }
          <Link to="/carteira">
            <button
              type="button"
              disabled={ verify }
              onClick={ () => addEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
