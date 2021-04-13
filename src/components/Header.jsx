import React from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, total = 0 } = this.props;
    const totalNumber = Number(total);
    return (
      <header>
        <h1>Personal Wallet</h1>
        <div>
          <span data-testid="email-field">Usuário</span>
          { email }
          <span data-testid="total-field">Despesas Totais R$:</span>
          { totalNumber }
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: string,
  total: number,
}.isRequired;

export default connect(mapStateToProps)(Header);
