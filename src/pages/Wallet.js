import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      spending: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { spending, currency } = this.state;
    return (
      <div>
        <header>
          <div data-testid="email-field">
            {email}
          </div>
          <div data-testid="total-field">
            {`gastos: ${spending}`}
          </div>
          <div data-testid="header-currency-field">
            {`moeda: ${currency}`}
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email });

Wallet.propTypes = { email: Proptypes.string.isRequired };

export default connect(mapStateToProps, null)(Wallet);
