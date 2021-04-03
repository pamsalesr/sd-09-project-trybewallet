import './Wallet.css';
import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userState } = this.props;
    console.log(userState);
    return (
      <div>
        <header className="header">
          <h1 className="title">TRYBE</h1>
          <p data-testid="email-field">
            Email:
            { userState }
          </p>
          <p data-testid="total-field">
            Despesa Total: R$
            { parseFloat(0).toFixed(2) }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.user.email,
});

Wallet.propTypes = {
  userState: string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
