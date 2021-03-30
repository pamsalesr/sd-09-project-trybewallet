import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { emailInfo } = this.props;
    const { totalExpenses, currency } = this.state;
    return (
      <header>
        TrybeWallet
        <p data-testid="email-field">{ emailInfo }</p>
        <p data-testid="total-field">{totalExpenses}</p>
        <p data-testid="header-currency-field">{currency}</p>
      </header>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   teste: dispatch('teste'),
// });

Wallet.propTypes = {
  emailInfo: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailInfo: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
