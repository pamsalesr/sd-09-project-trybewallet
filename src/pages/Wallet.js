import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm/index';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies: fetch } = this.props;
    fetch();
  }

  render() {
    return (
      <div>
        <Header />
        TrybeWallet
        <ExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchCurrencies,
};

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
