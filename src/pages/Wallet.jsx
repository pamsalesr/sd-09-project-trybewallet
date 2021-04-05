import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import OutcomeForm from '../components/OutcomeForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <OutcomeForm />
        <ExpensesTable />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
