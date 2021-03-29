import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiCurrencies } from '../actions';
import Header from '../components/Header';
import NewExpense from '../components/NewExpense';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <NewExpense />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(apiCurrencies()),
});

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
