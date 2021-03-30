import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getTotalValue = this.getTotalValue.bind(this);
  }

  getTotalValue() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      return acc + ((parseFloat(value)) * (parseFloat(exchangeRates[currency].ask)));
    }, 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="wallet-header">
        <p
          data-testid="email-field"
        >
          {`E-mail: ${email}`}
        </p>
        <div className="wallet-header-total">
          <p
            data-testid="total-field"
          >
            {`Despesa Total: R$ ${this.getTotalValue()}`}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
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
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(Header);
