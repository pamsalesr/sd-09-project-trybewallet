import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userState, walletState } = this.props;
    return (
      <div>
        <section>
          <div>
            <span>email:</span>
            <h5
              data-testid="email-field"
            >
              { userState.email }
            </h5>
          </div>
          <div>
            <span>Gastos totais:</span>
            <p
              data-testid="total-field"
            >
              { walletState.expenses }
            </p>
          </div>
          <div>
            <span>Câmbio utilizado:</span>
            <p
              data-testid="header-currency-field"
            >
              BRL
            </p>
          </div>
        </section>
      </div>
    );
  }
}

Wallet.propTypes = ({
  userState: PropTypes.objectOf(PropTypes.string),
  walletState: PropTypes.objectOf(PropTypes.array),
}).isRequired;

const mapStateToProps = (state) => ({
  userState: state.user,
  walletState: state.wallet,
});

export default connect(mapStateToProps)(Wallet);
