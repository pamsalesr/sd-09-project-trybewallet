import React from 'react';
import { connect } from 'react-redux';
import LoginInput from '../components/LoginInputs';

class Login extends React.Component {
  render() {
    return (
      <form>
        <h3>Login:</h3>
        <LoginInput />
      </form>
    );
  }
}

export default connect(null, null)(Login);
