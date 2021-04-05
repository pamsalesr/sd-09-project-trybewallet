import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import OutcomeForm from '../components/OutcomeForm';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <OutcomeForm />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
