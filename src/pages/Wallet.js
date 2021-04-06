import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.getTotal = this.getTotal.bind(this);
  }

  getTotal() {
    const { expenses } = this.props;
    console.log(expenses);
    let total = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      total += value * exchangeRates[currency].ask;
    });
    return total;
  }

  render() {
    const { email } = this.props;

    return (
      <section>
        <div className="wallet-head">
          <span data-testid="email-field">
            {`Email: ${email}`}
          </span>
          <span data-testid="total-field">
            Despesa Total:
            { this.getTotal().toFixed(2) }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
        <ExpenseForm />
      </section>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(Object),
};

Wallet.defaultProps = {
  email: '',
  expenses: [{}],
};

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps, null)(Wallet);
