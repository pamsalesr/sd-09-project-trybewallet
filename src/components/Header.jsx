import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {

    const { userState, walletState } = this.props;

    return ( 
      <div>
        <section>
          <label htmlFor="user-email">
            email:
            <h5
              data-testid="email-field"
              name="user-email"
            >
              { userState.email }
            </h5>
          </label>

          <label htmlFor="expenses">
            Gastos totais:
            <p
              data-testid="total-field"
              name="expenses"
            >
              { walletState.expenses }
            </p>
          </label>

          <label htmlFor="currency">
            Câmbio utilizado:
            <p
              data-testid="header-currency-field"
              name="currency"
            >
              { 'BRL' }
            </p>
          </label>

        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.user,
  walletState: state.wallet,
});

export default connect(mapStateToProps)(Header);
