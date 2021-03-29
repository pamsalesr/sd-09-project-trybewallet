import React from 'react';
import './Login.css'

class Login extends React.Component {
  render() {
    return (
      <>
        <h1>Trybe Wallet</h1>
        <form action="">
          <label for="user">
            user:
            <input type="text" name="user" id="" />
          </label>
          <label for="password">
            password:
            <input type="text" name="password" id="" />
          </label>
          <button type="submit">Login</button>
        </form>
      </>

    );
  }
}

export default Login;
