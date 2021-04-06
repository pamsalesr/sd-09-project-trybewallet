import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Header from '../components/Header';
import ExpenseTable from '../components/ExpenseTable';
import { fetchCurrencyTypes } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencyTypes } = this.props;
    getCurrencyTypes();
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
        <ExpenseTable />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencyTypes: () => dispatch(fetchCurrencyTypes()),
});

Wallet.propTypes = {
  getCurrencyTypes: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
