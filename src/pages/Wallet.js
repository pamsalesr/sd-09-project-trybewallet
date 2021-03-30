import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiCurrencies } from '../actions';
import Header from '../components/Header';
import NewExpense from '../components/NewExpense';
import Table from '../components/Table';
import EditExpense from '../components/EditExpense';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <div>
        <Header />
        {!isEditing && <NewExpense />}
        {isEditing && <EditExpense />}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(apiCurrencies()),
});

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
