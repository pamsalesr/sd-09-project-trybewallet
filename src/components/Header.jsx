import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.sumValues = this.sumValues.bind(this);
  }

  sumValues() {
    const { obj } = this.props;
    let sumTotal = 0;
    obj.forEach(({ value, exchangeRates, currency }) => {
      sumTotal += (+value * exchangeRates[currency].ask);
    });
    return sumTotal.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h4 data-testid="email-field">{ email }</h4>
        <h5 data-testid="total-field">{ this.sumValues() }</h5>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  obj: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
