import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import get from '../services/api';
import { walletThunk } from '../actions';

class Wallet extends Component {
  constructor() {
    super();
    this.handleApi = this.handleApi.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.storeExp = this.storeExp.bind(this);
    this.totalExp = this.totalExp.bind(this);
    // this.state = {
    //   currencies: [],
    //   expenses: {
    //     id: 0,
    //     value: 0,
    //     description: '',
    //     currency: '',
    //     method: '',
    //     tag: '',
    //   },
    // };
  }

  componentDidMount() {
    this.handleApi();
  }

  render() {
    <>
    </>;
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(walletThunk(expenses)),
});

// Wallet.propTypes = {
//   email: PropTypes.string.isRequired,
//   saveExpenses: PropTypes.func.isRequired,
//   expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
