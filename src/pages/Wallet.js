import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import Header from '../components/Header';
import ExpenseForms from '../components/ExpenseForms';

class Wallet extends React.Component {
  render() {
    // const { total } = this.state;
    const { email, total } = this.props;
    return (
      <div>
        <Header email={ email } total={ total } />
        <ExpenseForms />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: string,
}.isRequired;

const mapStatetoProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStatetoProps)(Wallet);
