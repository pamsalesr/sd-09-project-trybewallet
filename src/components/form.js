import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { handleChange, logInWallet, desableButton } = this.props;
    return (
      <form>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="passWord">
          Senha
          <input
            type="password"
            name="passWord"
            data-testid="password-input"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          name="entrar"
          disabled={ desableButton }
          onClick={ () => logInWallet() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  logInWallet: PropTypes.func.isRequired,
  desableButton: PropTypes.bool.isRequired,
};

export default Form;
