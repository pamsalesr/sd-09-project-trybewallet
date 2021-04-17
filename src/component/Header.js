import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  calcExpenses() {
    const { consultExpenses } = this.props;
    let calc = 0;
    consultExpenses.forEach((element) => {
      const convertValue = element.value;
      const convertAsk = element.exchangeRates[element.currency].ask;
      calc += (convertValue * convertAsk);
    });
    return calc.toFixed(2);
  }

  headerPage() {
    const { userEmail } = this.props;
    return (
      <header id="header">
        email:
        <span data-testid="email-field" id="header-email">{ userEmail }</span>
        despesa total:
        <span data-testid="total-field" id="header-total-expenditure">
          { this.calcExpenses() }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }

  render() {
    return (
      <>
        { this.headerPage() }
      </>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  userEmail: user.email,
  consultExpenses: wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.func,
  consultExpenses: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Header);
