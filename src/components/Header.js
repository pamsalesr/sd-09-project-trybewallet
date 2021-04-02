import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, total = 0 } = this.props;
    return (
      <header>
        <span>email:</span>
        <span data-testid="email-field">{ email }</span>
        <span>Despesas Totais R$:</span>
        <span data-testid="total-field">{total}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
