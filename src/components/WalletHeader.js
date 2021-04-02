import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { userEmail, totalExpenses } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">
          {`Olá ${userEmail}, seja bem-vindo(a)`}
        </h1>
        <h2 data-testid="total-field">
          {`Sua despesa total é de R$ ${totalExpenses || 0}`}
        </h2>
        <h2 data-testid="header-currency-field">
          Câmbio: BRL
        </h2>
      </div>
    );
  }
}

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(WalletHeader);
