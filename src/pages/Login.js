import React from 'react';
import { connect } from 'react-redux';
import LoginInput from '../components/LoginInput';

class Login extends React.Component {
  render() {
    return (
      <form>
        <h2>Login: </h2>
        <LoginInput />
      </form>
    );
  }
}

export default connect(null, null)(Login);
