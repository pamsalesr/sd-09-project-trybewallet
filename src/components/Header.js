import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
    };

    this.getTotalPrice = this.getTotalPrice.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      this.getTotalPrice();
    }
  }

  getTotalPrice() {
    const { expenses } = this.props;
    const { exchangeRates } = expenses[0];
    let total = 0;
    expenses.forEach((expense) => {
      total += (expense.value * exchangeRates[expense.currency].ask);
    });
    this.setState({
      totalPrice: total,
    });
  }

  render() {
    const { email } = this.props;
    const { totalPrice } = this.state;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {totalPrice.toFixed(2)}
        </p>
        <p data-testid="header-currency-field"> BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
