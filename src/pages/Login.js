import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import LoginHeader from '../components/LoginHeader';

export default class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main>
        <LoginHeader />
        <LoginForm history={ history } />
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
