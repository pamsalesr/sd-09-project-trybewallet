import React from 'react';
import { connect } from 'react-redux';
import { bool, number } from 'prop-types';
import ExpanseTable from './ExpanseTable';
import WalletForm from './WalletForm';
import EditExpenseForm from './EditExpenseForm';
import WalletHeader from './WalletHeader';

class Wallet extends React.Component {
  render() {
    const { editActivated = false, editID } = this.props;
    return (
      <div>
        <WalletHeader />
        { (editActivated) ? <EditExpenseForm editID={ editID } /> : <WalletForm />}
        <ExpanseTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editActivated: state.wallet.editActivated,
  editID: state.wallet.editID,
});

Wallet.propTypes = {
  editActivated: bool.isRequired,
  editID: number.isRequired,
};

export default connect(mapStateToProps)(Wallet);
