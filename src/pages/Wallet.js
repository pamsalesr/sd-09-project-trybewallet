import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import HeaderWallet from '../components/HeaderWallet';
import FormEditExpense from '../components/FormEditExpense';

class Wallet extends React.Component {
  render() {
    const { editExpense } = this.props;
    return (
      <div>
        <HeaderWallet />
        {!editExpense && <ExpenseForm />}
        {editExpense && <FormEditExpense />}
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editExpense: state.wallet.editExpense,
});

Wallet.propTypes = {
  editExpense: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
