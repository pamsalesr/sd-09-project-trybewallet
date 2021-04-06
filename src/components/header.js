import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateTotal } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalValue: 0,
    };
    this.updateTotal = this.updateTotal.bind(this);
  }

  componentDidMount() {
    this.updateTotal();
  }

  componentDidUpdate() {
    const { total } = this.props;
    const { totalValue } = this.state;
    if (total !== totalValue) {
      this.updateTotal();
    }
  }

  updateTotal() {
    const { expenses, updateValue } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      const { exchangeRates, value, currency } = expense;
      total += value * exchangeRates[currency].ask;
    });
    this.setState({
      totalValue: total,
    });
    updateValue(total);
  }

  render() {
    const { email } = this.props;
    const { totalValue } = this.state;
    return (
      <div>
        <img src="https://theme.zdassets.com/theme_assets/9633455/9814df697eaf49815d7df109110815ff887b3457.png" alt="trybe logo" height="45px" />
        <div className="header">
          <h3 data-testid="email-field">
            Email:
            { email }
          </h3>
          <h3 data-testid="total-field">
            Despesa Total:
            { totalValue || '0' }
          </h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  updateValue: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateValue: (total) => dispatch(updateTotal(total)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.total,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
