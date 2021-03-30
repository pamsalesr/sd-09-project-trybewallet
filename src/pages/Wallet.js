import React from 'react';
import Header from '../components/header';
import RegistrationForm from '../components/registrationForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <RegistrationForm />
      </div>
    );
  }
}

export default Wallet;
