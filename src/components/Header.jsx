import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expensesSum } = this.props;

    return (
      <div id="wallet-header">
        <div id="trybe-logo">Trybe Wallet</div>
        <div id="user-info">
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <span>
            Despesa total:
            <span data-testid="total-field">
              { ` R$ ${expensesSum ? expensesSum.toFixed(2) : 0}` }
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expensesSum: PropTypes.number,
}.isRequired;

export default Header;
