import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, string } from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getTotal = this.getTotal.bind(this);
  }

  getTotal() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      sum += +(value * exchangeRates[currency].ask);
    });
    return sum;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">{ `Despesa Total: ${this.getTotal()}` }</p>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = { expenses: arrayOf().isRequired, email: string.isRequired };

const mapStateToProps = ({ user, wallet }) => (
  { email: user.email, expenses: wallet.expenses }
);

export default connect(mapStateToProps)(Header);
