import React from 'react';

class FormLogin extends React.Component {
  // FUNÇÕES QUE ATUALIZAM OS ESTADOS DOS INPUTS

  render() {
    return (
      <section>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            nome="email"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="empasswordail"
            data-testid="password-input"
            // FUNÇÃO ONCLICK
          />
        </label>
        <button
          type="button"
          // FUNÇÃO ONCLICK
          to="/carteira"
        >
          Entrar
        </button>
      </section>
    );
  }
}

export default FormLogin;
