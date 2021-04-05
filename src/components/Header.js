import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <header>
        { console.log(userEmail) }
        <span data-testid="email-field">{`Email: ${userEmail} | `}</span>
        <span data-testid="total-field">
          {`Gasto Total: R$ ${this.totalExpenses()} | `}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
