import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <fieldset>
            <input type="email" data-testid="email-input"></input>
            <input type="password" data-testid="password-input"></input>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
