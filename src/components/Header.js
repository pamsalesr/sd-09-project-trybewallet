import React from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, total = 0 } = this.props;
    const newTotal = Number(total);
    console.log(newTotal);
    return (
      <header>
        <span>email:</span>
        <span data-testid="email-field">{ email }</span>
        <span>Despesas Totais R$:</span>
        <span data-testid="total-field">{ newTotal }</span>
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

Header.propTypes = {
  email: string,
  total: number,
}.isRequired;
