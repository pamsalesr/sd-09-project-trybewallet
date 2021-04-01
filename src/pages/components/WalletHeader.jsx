import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletHeader extends Component {
  render() {
    const { email } = this.props;
    console.log(this.props.email)
    return (
      <header>
        <div className="header-title">TrybeWallet</div>
        <div className="container">
          <div
            className="user-email"
            data-testid="email-field"
          >
            {email}
         </div>
          <div className="value-container">
            <div
              className="total-expense"
              data-testid="total-field"
            >
              1.000.000,00
            </div>
            <div
             className="wallet-currency"
              data-testid="header-currency-field"
            >
              BRL
            </div>
          </div>
        </div>
     </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
})

export default connect(mapStateToProps)(WalletHeader);
