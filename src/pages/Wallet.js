import { connect } from 'react-redux';
import React from 'react';
import propTypes from 'prop-types';
import ExpenseForm from '../component/ExpenseForm';
import Header from '../component/Header';
import { requestApiAction } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
  }

  func() {
    const { currency } = this.props;
    const currencyArray = Object.keys(currency);
    const newArray = currencyArray.filter((value) => value !== 'USDT');
    return newArray.map((code) => (
      <option data-testid={ code } key={ code }>{code}</option>));
  }

  render() {
    const { userEmail } = this.props;
    const mapArr = this.func();
    return (
      <>
        <Header email={ userEmail } />
        <ExpenseForm option={ mapArr } />
        )
      </>
    );
  }
}

const mapStateToprops = (state) => ({
  userEmail: state.user.email,
  currency: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(requestApiAction()),
});
export default connect(mapStateToprops, mapDispatchToProps)(Wallet);

const { string, shape, func } = propTypes;
Wallet.propTypes = {
  userEmail: string,
  currency: shape(),
  requestApi: func,
};

Wallet.defaultProps = {
  userEmail: '',
  currency: [],
  requestApi: () => {},
};
